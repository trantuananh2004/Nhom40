require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} = require('@simplewebauthn/server');
const { isoBase64URL } = require('@simplewebauthn/server/helpers');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Thêm cả localhost và 127.0.0.1
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware xác thực
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullname
    });

    await user.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/webauthn/register/start', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Tạo user mới nếu chưa tồn tại
  if (!users.has(email)) {
    users.set(email, {
      id: Date.now().toString(),
      email,
      credentials: []
    });
  }

  const user = users.get(email);

  // Tạo registration options
  const options = await generateRegistrationOptions({
    rpName: 'Your App Name',
    rpID: 'localhost',
    userID: user.id,
    userName: email,
    attestationType: 'none',
    authenticatorSelection: {
      userVerification: 'preferred',
      residentKey: 'preferred'
    }
  });

  // Lưu challenge để verify sau
  user.currentChallenge = options.challenge;

  res.json(options);
});

app.post('/api/webauthn/register/finish', async (req, res) => {
  const { email, registrationResponse } = req.body;

  const user = users.get(email);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
    const verification = await verifyRegistrationResponse({
      response: registrationResponse,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost'
    });

    if (verification.verified) {
      // Lưu credential
      const credential = {
        id: registrationResponse.id,
        publicKey: registrationResponse.response.publicKey,
        counter: verification.registrationInfo.counter,
        deviceType: registrationResponse.response.attestationObject ? 'platform' : 'cross-platform',
        backedUp: verification.registrationInfo.credentialBackedUp,
        createdAt: new Date()
      };

      user.credentials.push(credential);
      credentials.set(credential.id, credential);

      // Tạo token
      const token = generateToken(user);

      res.json({
        verified: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          credentials: user.credentials
        }
      });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Registration verification failed:', error);
    res.status(400).json({ error: 'Verification failed' });
  }
});

app.post('/api/webauthn/authenticate/start', async (req, res) => {
  const { email } = req.body;

  const user = users.get(email);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Tạo authentication options
  const options = await generateAuthenticationOptions({
    rpID: 'localhost',
    allowCredentials: user.credentials.map(cred => ({
      id: cred.id,
      type: 'public-key'
    })),
    userVerification: 'preferred'
  });

  // Lưu challenge để verify sau
  user.currentChallenge = options.challenge;

  res.json(options);
});

app.post('/api/webauthn/authenticate/finish', async (req, res) => {
  const { email, authenticationResponse } = req.body;

  const user = users.get(email);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const credential = credentials.get(authenticationResponse.id);
  if (!credential) {
    return res.status(400).json({ error: 'Credential not found' });
  }

  try {
    const verification = await verifyAuthenticationResponse({
      response: authenticationResponse,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
      authenticator: {
        credentialPublicKey: credential.publicKey,
        credentialID: credential.id,
        counter: credential.counter
      }
    });

    if (verification.verified) {
      // Cập nhật counter
      credential.counter = verification.authenticationInfo.newCounter;

      // Tạo token
      const token = generateToken(user);

      res.json({
        verified: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          credentials: user.credentials
        }
      });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Authentication verification failed:', error);
    res.status(400).json({ error: 'Verification failed' });
  }
});

app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

app.delete('/api/webauthn/credentials', authenticateToken, (req, res) => {
  const { credentialId } = req.body;
  const user = users.get(req.user.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Xóa credential
  user.credentials = user.credentials.filter(cred => cred.id !== credentialId);
  credentials.delete(credentialId);

  res.json({
    id: user.id,
    email: user.email,
    credentials: user.credentials
  });
});

// Thêm route test để kiểm tra server
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 