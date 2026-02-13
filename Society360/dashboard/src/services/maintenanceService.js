import api from './api';

// Create new maintenance request
export const createMaintenance = async (maintenanceData) => {
  try {
    const response = await api.post('/maintenance', maintenanceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get all maintenance requests 
export const getAllMaintenance = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/maintenance${params ? `?${params}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get single maintenance request
// export const getMaintenance = async (id) => {
//   try {
//     const response = await api.get(`/maintenance/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Network error' };
//   }
// };

// Update maintenance request 
export const updateMaintenance = async (id, updateData) => {
  try {
    const response = await api.put(`/maintenance/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// // Get maintenance statistics
// export const getMaintenanceStats = async () => {
//   try {
//     const response = await api.get('/maintenance/stats');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Network error' };
//   }
// };