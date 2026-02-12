import React, { useState, useEffect } from 'react';
import { 
  Users, Home, UserCheck, Wrench, 
  DollarSign, AlertCircle, Bell, Calendar 
} from 'lucide-react';
import { getDashboardStats } from '../services/AdminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div style={styles.date}>
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {/* <StatCard 
          icon={<Users size={24} />}
          title="Total Residents"
          value={stats?.stats.totalResidents || 0}
          color="#3182ce"
          link="/admin/users"
        />
        
        <StatCard 
          icon={<Home size={24} />}
          title="Units Occupied"
          value={`${stats?.stats.occupiedUnits || 0}/${stats?.stats.totalUnits || 0}`}
          subValue={`${stats?.stats.occupancyRate || 0}% occupied`}
          color="#38a169"
          link="/admin/units"
        /> */}
        
        <StatCard 
          icon={<UserCheck size={24} />}
          title="Pending Visitors"
          value={stats?.stats.pendingVisitors || 0}
          color="#805ad5"
          link="/admin/visitors?status=pending"
        />
        
        <StatCard 
          icon={<Wrench size={24} />}
          title="Pending Maintenance"
          value={stats?.stats.pendingMaintenance || 0}
          color="#dd6b20"
          link="/admin/maintenance?status=pending"
        />
        
        <StatCard 
          icon={<DollarSign size={24} />}
          title="Monthly Revenue"
          value={`₹${(stats?.stats.monthlyRevenue || 0).toLocaleString()}`}
          color="#38a169"
          link="/admin/financial"
        />
        
        <StatCard 
          icon={<AlertCircle size={24} />}
          title="Pending Bills"
          value={stats?.stats.pendingBills || 0}
          color="#e53e3e"
          link="/admin/bills"
        />
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.quickActions}>
          <ActionButton 
            icon={<Bell size={20} />}
            label="Create Announcement"
            link="/admin/announcements/new"
          />
          {/* <ActionButton 
            icon={<Users size={20} />}
            label="Add New Resident"
            link="/admin/users/new"
          />
          <ActionButton 
            icon={<Home size={20} />}
            label="Add New Unit"
            link="/admin/units/new"
          /> */}
          <ActionButton 
            icon={<DollarSign size={20} />}
            label="Generate Bills"
            link="/admin/bills/generate"
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Activities</h2>
        <div style={styles.activities}>
          {stats?.recentActivities.maintenance.map((item, index) => (
            <ActivityItem 
              key={index}
              type="maintenance"
              title={item.title}
              description={`Submitted by ${item.createdBy?.name || 'Resident'}`}
              time={item.createdAt}
            />
          ))}
          {stats?.recentActivities.visitors.map((item, index) => (
            <ActivityItem 
              key={index}
              type="visitor"
              title={`Visitor: ${item.visitorName}`}
              description={`For ${item.residentId?.name || 'Resident'}`}
              time={item.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subValue, color, link }) => (
  <div style={{...styles.statCard, borderLeft: `4px solid ${color}`}}>
    <div style={{...styles.statIcon, color}}>
      {icon}
    </div>
    <div style={styles.statContent}>
      <p style={styles.statTitle}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
      {subValue && <p style={styles.statSubValue}>{subValue}</p>}
    </div>
    {link && (
      <a href={link} style={styles.statLink}>
        View →
      </a>
    )}
  </div>
);

const ActionButton = ({ icon, label, link }) => (
  <a href={link} style={styles.actionButton}>
    <div style={styles.actionIcon}>{icon}</div>
    <span style={styles.actionLabel}>{label}</span>
  </a>
);

const ActivityItem = ({ type, title, description, time }) => {
  const getIcon = () => {
    switch(type) {
      case 'maintenance': return '🔧';
      case 'visitor': return '👤';
      default: return '📝';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div style={styles.activityItem}>
      <span style={styles.activityIcon}>{getIcon()}</span>
      <div style={styles.activityContent}>
        <p style={styles.activityTitle}>{title}</p>
        <p style={styles.activityDesc}>{description}</p>
      </div>
      <span style={styles.activityTime}>{formatTime(time)}</span>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f7fafc',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    color: '#1a365d',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#718096',
    fontSize: '14px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  statIcon: {
    fontSize: '24px'
  },
  statContent: {
    flex: 1
  },
  statTitle: {
    color: '#718096',
    fontSize: '14px',
    margin: '0 0 8px 0',
    fontWeight: '600'
  },
  statValue: {
    color: '#1a365d',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 5px 0'
  },
  statSubValue: {
    color: '#4a5568',
    fontSize: '13px',
    margin: 0
  },
  statLink: {
    color: '#3182ce',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    color: '#1a365d',
    fontSize: '20px',
    margin: '0 0 20px 0'
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionButton: {
    backgroundColor: '#f7fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    padding: '20px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  actionButtonHover: {
    backgroundColor: '#edf2f7',
    borderColor: '#cbd5e0',
    transform: 'translateY(-2px)'
  },
  actionIcon: {
    color: '#3182ce',
    fontSize: '20px'
  },
  actionLabel: {
    color: '#1a365d',
    fontWeight: '600',
    fontSize: '14px',
    textAlign: 'center'
  },
  activities: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0'
  },
  activityIcon: {
    fontSize: '20px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: '8px'
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    color: '#1a365d',
    fontWeight: '600',
    margin: '0 0 5px 0',
    fontSize: '14px'
  },
  activityDesc: {
    color: '#718096',
    fontSize: '13px',
    margin: 0
  },
  activityTime: {
    color: '#a0aec0',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#718096'
  }
};

export default AdminDashboard;