import React, { useState, useEffect } from 'react';
import useAdminService, { AdminUser } from '../../services/AdminService';
import NavHeader from '../../components/navHeader/navHeader';
import Navbar from '../../components/navBar/NavBar';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import Loading from '../../components/loading';

const Admin = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const adminService = useAdminService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = await adminService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user: AdminUser) => {
    navigate('/admin/view-account', { state: { selectedUser: user } });
  };

  return (
    <div className="body-main">
      <NavHeader />
      <div className="body-container">
        <div className="body-container--left">
          <div className="admin-card-container">
            {loading && <div className="loading-wrapper">
              <Loading />
            </div>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && users.map((user) => (
              <div key={user.userId} className="coin-card dark-bg--gradient admin-card" onClick={() => handleUserSelect(user)}>
                <div className="h3">Email: {user.email}</div>
                <div className="coin-card--heading">{user.username}</div>
                <div className="h3">Admin: {user.isAdmin ? 'Yes' : 'No'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />  
    </div>
  );
};

export default Admin;