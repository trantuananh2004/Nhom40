import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <main className="landing-main">
        <div className="hero-section">
          <h1>Chào mừng đến với FaS</h1>
          <p className="hero-subtitle">
            Nền tảng xác thực hiện đại với công nghệ bảo mật tiên tiến
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="hero-button primary">
              Bắt đầu ngay
            </Link>
          </div>
        </div>

        <div className="features-section">
          <h2>Tính năng bảo mật</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Xác thực không mật khẩu</h3>
              <p>Đăng nhập an toàn với vân tay, khuôn mặt hoặc mã PIN qua FIDO2/WebAuthn</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3>Xác thực đa yếu tố</h3>
              <p>Bảo vệ tài khoản với TOTP và khóa bảo mật FIDO</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Đăng nhập một lần</h3>
              <p>Tích hợp OAuth và SAML cho trải nghiệm đăng nhập liền mạch</p>
            </div>
          </div>
        </div>

        <h2>Bảo mật tối ưu</h2>
        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon">📱</div>
            <h3>Passkey</h3>
            <p>Đăng nhập nhanh chóng và an toàn với sinh trắc học hoặc mã PIN</p>
          </div>
          <div className="security-card">
            <div className="security-icon">📧</div>
            <h3>Passcode qua Email</h3>
            <p>Nhận mã xác nhận qua email để đăng nhập hoặc khôi phục tài khoản</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🔒</div>
            <h3>MFA/2FA</h3>
            <p>Tăng cường bảo mật với Google Authenticator và khóa bảo mật</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🌐</div>
            <h3>SSO</h3>
            <p>Đăng nhập dễ dàng với Google, Microsoft và các dịch vụ doanh nghiệp</p>
          </div>
        </div>

        {/* Section giới thiệu quy trình tích hợp FIDO2 cho website khách */}
        <div className="integration-section" style={{marginTop: '4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2.5rem 2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Tích hợp xác thực FIDO2 cho website của bạn</h2>
          <ol style={{maxWidth: 800, margin: '0 auto', color: '#ccc', fontSize: '1.15rem', lineHeight: 1.7}}>
            <li>Website khách (ví dụ: <b>example.com</b>) tích hợp <b>FaS Elements</b> (tương tự như hanko element) hoặc gọi API của <b>FaS</b> (tương tự hanko.io).</li>
            <li>Người dùng truy cập <b>example.com</b>, nhấn "Đăng nhập" và sử dụng passkey (qua sinh trắc học hoặc mã PIN) trên thiết bị của họ.</li>
            <li><b>FaS</b> xác minh passkey và trả về token cho <b>example.com</b> để cho phép người dùng truy cập.</li>
            <li>Toàn bộ trải nghiệm diễn ra trên <b>example.com</b>, không chuyển hướng đến FaS.</li>
          </ol>
        </div>

        {/* Section về tùy chỉnh giao diện và API/SDK */}
        <div className="customization-section" style={{marginTop: '4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2.5rem 2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Tùy chỉnh và Tích hợp</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 1200, margin: '0 auto'}}>
            <div style={{background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px'}}>
              <h3 style={{color: '#4a90e2', marginBottom: '1rem'}}>Giao diện tùy chỉnh</h3>
              <p style={{color: '#ccc', lineHeight: 1.6}}>
                FaS cung cấp các thành phần giao diện web (như <code style={{background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px'}}>&lt;fas-auth&gt;</code>, <code style={{background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px'}}>&lt;fas-profile&gt;</code>) để tích hợp giao diện đăng ký, đăng nhập vào website, có thể tùy chỉnh bằng CSS.
              </p>
            </div>
            
            <div style={{background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px'}}>
              <h3 style={{color: '#4a90e2', marginBottom: '1rem'}}>API và SDK linh hoạt</h3>
              <p style={{color: '#ccc', lineHeight: 1.6}}>
                FaS cung cấp API REST và SDK JavaScript để tích hợp xác thực vào backend và frontend, hỗ trợ các framework như React, Vue, Next.js.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2024 FaS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 