import api from './api';

// Create new visitor request
export const createVisitor = async (visitorData) => {
  try {
    const response = await api.post('/visitors', visitorData);
    return response.data;
  } catch (error) {
    console.error('Create visitor error:', error);
    throw error;
  }
};

// Get all visitors
export const getAllVisitors = async () => {
  try {
    const response = await api.get('/visitors');
    return response.data;
  } catch (error) {
    console.error('Get all visitors error:', error);
    throw error;
  }
};

// Get today's visitors (staff only)
export const getTodayVisitors = async () => {
  try {
    const response = await api.get('/visitors/today');
    return response.data;
  } catch (error) {
    console.error('Get today visitors error:', error);
    throw error;
  }
};

// Update visitor status
export const updateVisitorStatus = async (visitorId, status) => {
  try {
    const response = await api.put(`/visitors/${visitorId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Update status error:', error);
    throw error;
  }
};
