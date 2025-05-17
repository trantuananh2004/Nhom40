import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Xin chào, {user?.fullname}</span>
          <button onClick={logout} className="logout-btn">Đăng xuất</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Thông tin cá nhân</h2>
          <div className="info-item">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
          <div className="info-item">
            <label>Họ tên:</label>
            <span>{user?.fullname}</span>
          </div>
          <div className="info-item">
            <label>Ngày tham gia:</label>
            <span>{new Date(user?.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Hoạt động gần đây</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <span className="activity-text">Đăng nhập lần cuối: {new Date(user?.lastLogin).toLocaleString('vi-VN')}</span>
            </div>
            {/* Thêm các hoạt động khác ở đây */}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Tính năng nhanh</h2>
          <div className="quick-actions">
            <button className="action-btn">Cập nhật thông tin</button>
            <button className="action-btn">Đổi mật khẩu</button>
            <button className="action-btn">Xem lịch sử hoạt động</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 