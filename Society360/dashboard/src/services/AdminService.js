import api from './api';

// Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// User Management
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Maintenance Management
export const getAllMaintenance = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/admin/maintenance${params ? `?${params}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const updateMaintenanceStatus = async (id, updateData) => {
  try {
    const response = await api.put(`/admin/maintenance/${id}/status`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Visitor Management
export const getAllVisitors = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/admin/visitors${params ? `?${params}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const approveVisitor = async (id) => {
  try {
    const response = await api.put(`/admin/visitors/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const rejectVisitor = async (id, reason) => {
  try {
    const response = await api.put(`/admin/visitors/${id}/reject`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const checkInVisitor = async (id) => {
  try {
    const response = await api.put(`/admin/visitors/${id}/checkin`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const checkOutVisitor = async (id) => {
  try {
    const response = await api.put(`/admin/visitors/${id}/checkout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Unit Management
export const getAllUnits = async () => {
  try {
    const response = await api.get('/admin/units');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const createUnit = async (unitData) => {
  try {
    const response = await api.post('/admin/units', unitData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Announcement Management
export const createAnnouncement = async (announcementData) => {
  try {
    const response = await api.post('/admin/announcements', announcementData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Billing Management
export const generateBills = async (billData) => {
  try {
    const response = await api.post('/admin/bills/generate', billData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};