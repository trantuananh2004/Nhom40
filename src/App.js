import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import './App.css';

// Tạo theme tùy chỉnh
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#00ff00',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
        contained: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
        outlined: {
          borderColor: '#ffffff',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

