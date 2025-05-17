import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <p>Ứng dụng web hiện đại với các tính năng bảo mật tiên tiến.</p>
        </div>
        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/privacy">Chính sách bảo mật</a></li>
            <li><a href="/terms">Điều khoản sử dụng</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <ul>
            <li>Email: support@example.com</li>
            <li>Điện thoại: (123) 456-7890</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 My App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 