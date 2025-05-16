import React from 'react';

const AuthForm = ({ type }) => {
  const isLogin = type === 'login';

  return (
    <div>
      <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
      <form>
        {!isLogin && (
          <div>
            <label>Họ tên:</label>
            <input type="text" name="fullname" required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
