import React, { createContext, useContext, useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

const API_BASE_URL = 'http://localhost:3001';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi component mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Gọi API để xác thực token và lấy thông tin user
        const response = await fetch(`${API_BASE_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token không hợp lệ, xóa token
          localStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const registerWithWebAuthn = async (email) => {
    try {
      // 1. Lấy registration options từ server
      const optionsResponse = await fetch(`${API_BASE_URL}/api/webauthn/register/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!optionsResponse.ok) {
        throw new Error('Failed to get registration options');
      }

      const options = await optionsResponse.json();

      // 2. Bắt đầu quá trình đăng ký WebAuthn
      const registrationResponse = await startRegistration(options);

      // 3. Gửi response về server để xác thực
      const verificationResponse = await fetch(`${API_BASE_URL}/api/webauthn/register/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          registrationResponse
        })
      });

      if (!verificationResponse.ok) {
        throw new Error('Failed to verify registration');
      }

      const { token, user: userData } = await verificationResponse.json();
      
      // 4. Lưu token và cập nhật state
      localStorage.setItem('authToken', token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('WebAuthn registration failed:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithWebAuthn = async (email) => {
    try {
      // 1. Lấy authentication options từ server
      const optionsResponse = await fetch(`${API_BASE_URL}/api/webauthn/authenticate/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!optionsResponse.ok) {
        throw new Error('Failed to get authentication options');
      }

      const options = await optionsResponse.json();

      // 2. Bắt đầu quá trình xác thực WebAuthn
      const authenticationResponse = await startAuthentication(options);

      // 3. Gửi response về server để xác thực
      const verificationResponse = await fetch(`${API_BASE_URL}/api/webauthn/authenticate/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          authenticationResponse
        })
      });

      if (!verificationResponse.ok) {
        throw new Error('Failed to verify authentication');
      }

      const { token, user: userData } = await verificationResponse.json();
      
      // 4. Lưu token và cập nhật state
      localStorage.setItem('authToken', token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('WebAuthn authentication failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    loading,
    setUser,
    registerWithWebAuthn,
    loginWithWebAuthn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 