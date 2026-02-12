import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Home, Bell, Settings, LogOut, Wrench, DollarSign } from 'lucide-react';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      // Check if user is admin
      if (parsedUser.role !== 'admin') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
        return;
      }
      
      setUser(parsedUser);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>CN</div>
            <span style={styles.logoText}>Admin Panel</span>
          </div>
        </div>

        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            {(user.name || user.username).charAt(0).toUpperCase()}
          </div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>{user.name || user.username}</div>
            <div style={styles.userRole}>Administrator</div>
            <div style={styles.userEmail}>{user.email}</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <NavItem icon={<LayoutDashboard />} label="Dashboard" link="/admin/dashboard" />
          {/* <NavItem icon={<Users />} label="User Management" link="/admin/users" />
          <NavItem icon={<Home />} label="Unit Management" link="/admin/units" /> */}
          <NavItem icon={<Bell />} label="Visitors" link="/admin/visitors" />
          <NavItem icon={<Wrench />} label="Maintenance" link="/admin/maintenance" />
          <NavItem icon={<Bell />} label="Announcements" link="/admin/announcements" />
          <NavItem icon={<DollarSign />} label="Billing" link="/admin/billing" />
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, link }) => (
  <a href={link} style={styles.navItem}>
    <span style={styles.navIcon}>{icon}</span>
    <span style={styles.navLabel}>{label}</span>
  </a>
);

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#1a365d',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    padding: '30px 25px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    color: '#1a365d',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700'
  },
  userInfo: {
    padding: '25px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  userAvatar: {
    width: '60px',
    height: '60px',
    backgroundColor: '#4299e1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '15px'
  },
  userDetails: {
    fontSize: '14px'
  },
  userName: {
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '5px'
  },
  userRole: {
    color: '#cbd5e0',
    fontSize: '13px',
    marginBottom: '3px'
  },
  userEmail: {
    color: '#a0aec0',
    fontSize: '12px'
  },
  nav: {
    flex: 1,
    padding: '20px 0'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 25px',
    color: '#cbd5e0',
    textDecoration: 'none',
    transition: 'all 0.2s',
    fontSize: '15px'
  },
  navItemHover: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white'
  },
  navIcon: {
    width: '20px',
    height: '20px'
  },
  navLabel: {
    fontWeight: '500'
  },
  sidebarFooter: {
    padding: '25px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  logoutButton: {
    width: '100%',
    backgroundColor: 'rgba(229, 62, 62, 0.2)',
    color: '#fc8181',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: '500',
    fontSize: '15px'
  },
  mainContent: {
    flex: 1,
    overflow: 'auto'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#718096'
  },
  spinner: {
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3182ce',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  }
};

export default AdminLayout;