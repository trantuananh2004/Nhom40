import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ type }) => {
  const isLogin = type === 'login';
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.fullname);
      }

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyAuth = async () => {
    alert('Chức năng xác thực Passkey (FIDO2) chưa được triển khai.');
  };

  const handleGoogleAuth = async () => {
    alert('Chức năng đăng nhập Google chưa được triển khai.');
  };

  const handleMicrosoftAuth = async () => {
    alert('Chức năng đăng nhập Microsoft chưa được triển khai.');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
        </div>
        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullname">Họ và tên</label>
              <input
                id="fullname"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Đang xử lý...</span>
              </div>
            ) : (
              isLogin ? 'Tiếp tục' : 'Tiếp tục'
            )}
          </button>
        </form>
        <div className="auth-divider">
          <span>hoặc</span>
        </div>
        <div className="auth-options">
          <button onClick={handlePasskeyAuth} className="auth-option passkey">
            <span style={{display:'flex',alignItems:'center'}}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 15v2"/><path d="M8 7a4 4 0 018 0v4H8V7z"/></svg>
            </span>
            Đăng nhập bằng Passkey
          </button>
          <button onClick={handleMicrosoftAuth} className="auth-option microsoft">
            <span style={{display:'flex',alignItems:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="9" height="9" fill="#F35325"/><rect x="13" y="2" width="9" height="9" fill="#81BC06"/><rect x="2" y="13" width="9" height="9" fill="#05A6F0"/><rect x="13" y="13" width="9" height="9" fill="#FFBA08"/></svg>
            </span>
            Đăng nhập với Microsoft
          </button>
          <button onClick={handleGoogleAuth} className="auth-option google">
            <span style={{display:'flex',alignItems:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.648c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.016 9.547-9.664 0-.648-.07-1.148-.156-1.664z"/><path fill="#34A853" d="M3.545 7.545l3.273 2.402c.891-1.742 2.523-2.898 4.437-2.898 1.07 0 2.07.367 2.844 1.07l2.133-2.07c-1.297-1.203-2.953-1.949-4.977-1.949-3.828 0-6.953 3.125-6.953 6.953 0 1.102.242 2.148.672 3.07z"/><path fill="#FBBC05" d="M12 22c2.703 0 4.977-.891 6.617-2.422l-3.07-2.523c-.844.57-1.922.914-3.547.914-2.734 0-5.047-1.844-5.867-4.32l-3.242 2.5c1.672 3.32 5.203 5.851 9.109 5.851z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.648c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.016 9.547-9.664 0-.648-.07-1.148-.156-1.664z"/></g></svg>
            </span>
            Đăng nhập với Google
          </button>
        </div>
        {isLogin ? (
          <div className="auth-footer">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="auth-link">Đăng ký</Link>
          </div>
        ) : (
          <>
            <div className="auth-footer">
              Đã có tài khoản?{' '}
              <Link to="/login" className="auth-link">Đăng nhập</Link>
            </div>
            <div style={{marginTop:'2rem', color:'#888', fontSize:'0.95rem', textAlign:'left'}}>
              Khi tạo tài khoản, bạn đồng ý với <button onClick={() => {}} style={{color:'#4a90e2', background:'none', border:'none', padding:0, cursor:'pointer'}}>điều khoản</button> và <button onClick={() => {}} style={{color:'#4a90e2', background:'none', border:'none', padding:0, cursor:'pointer'}}>chính sách bảo mật</button> của chúng tôi.<br/><br/>
              Sau khi đăng ký, chúng tôi sẽ gửi email chào mừng và cập nhật thông tin sản phẩm, tin tức ngành hàng tháng. Bạn có thể hủy đăng ký nhận tin bất cứ lúc nào.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
