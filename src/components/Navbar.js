import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">FaS</Link>
      <div className="nav-menu">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="nav-user">Xin chào, {user.fullname}</span>
            <button onClick={logout} className="nav-button logout">
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button login">Đăng nhập</Link>
            <Link to="/register" className="nav-button register">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
