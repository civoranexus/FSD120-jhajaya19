import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call admin login API
      const response = await fetch('http://localhost:3005/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // Include cookies if needed
      });

      const data = await response.json();

      if (data.success) {
        // Save token and admin data (matching AdminLayout expectations)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          ...data.admin,
          role: 'admin'
        }));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>CN</div>
          <h2 style={styles.logoText}>Society360 Admin</h2>
        </div>

        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}>Sign in to access the admin panel</p>

        {error && (
          <div style={styles.errorAlert}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={18} style={styles.inputIcon} />
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@society360.com"
              style={styles.input}
              required
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={18} style={styles.inputIcon} />
              Password
            </label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? 'Signing in...' : 'Sign In as Admin'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Forgot password? Contact system administrator
          </p>
          <p style={styles.footerNote}>
            ⚠️ This panel is for authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a365d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center'
  },
  logoIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#1a365d',
    color: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  logoText: {
    color: '#1a365d',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0
  },
  title: {
    color: '#1a365d',
    fontSize: '28px',
    textAlign: 'center',
    margin: '0 0 10px 0'
  },
  subtitle: {
    color: '#718096',
    textAlign: 'center',
    margin: '0 0 30px 0'
  },
  form: {
    marginBottom: '30px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#4a5568',
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '14px'
  },
  inputIcon: {
    color: '#718096'
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    fontFamily: 'inherit'
  },
  passwordContainer: {
    position: 'relative'
  },
  eyeButton: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#718096',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#1a365d',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px'
  },
  errorAlert: {
    backgroundColor: '#fed7d7',
    color: '#9b2c2c',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  footer: {
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '20px'
  },
  footerText: {
    color: '#718096',
    fontSize: '14px',
    margin: '0 0 10px 0'
  },
  footerNote: {
    color: '#dd6b20',
    fontSize: '12px',
    margin: 0
  }
};

export default AdminLogin;