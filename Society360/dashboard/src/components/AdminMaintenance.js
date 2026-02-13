import React, { useState, useEffect } from "react";
import { getAllMaintenance, updateMaintenanceStatus } from "../services/AdminService";
import { Wrench, AlertCircle, Clock } from "lucide-react";

function AdminMaintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [expandedId, setExpandedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    adminNotes: '',
    actualCost: ''
  });

  useEffect(() => {
    fetchMaintenance();
  }, [filterStatus]);

  const fetchMaintenance = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllMaintenance({ status: filterStatus });
      setMaintenance(response.data || []);
    } catch (err) {
      console.error('Error fetching maintenance:', err);
      setError(err.message || 'Failed to fetch maintenance');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMaintenance = async (maintenanceId) => {
    try {
      setActionLoading(true);
      await updateMaintenanceStatus(maintenanceId, {
        status: formData.status,
        priority: formData.priority,
        adminNotes: formData.adminNotes,
        actualCost: formData.actualCost ? parseInt(formData.actualCost) : undefined
      });
      fetchMaintenance();
      setExpandedId(null);
      setFormData({ status: '', priority: '', adminNotes: '', actualCost: '' });
      alert('Maintenance updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update maintenance');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: '#fff3cd', text: '#856404', label: 'Pending' },
      assigned: { bg: '#cfe2ff', text: '#084298', label: 'Assigned' },
      in_progress: { bg: '#cff4fc', text: '#055160', label: 'In Progress' },
      completed: { bg: '#d1e7dd', text: '#0f5132', label: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span style={{
        backgroundColor: config.bg,
        color: config.text,
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { bg: '#d1e7dd', text: '#0f5132', label: 'Low' },
      medium: { bg: '#fff3cd', text: '#856404', label: 'Medium' },
      high: { bg: '#f8d7da', text: '#842029', label: 'High' },
      urgent: { bg: '#f5c2c7', text: '#842029', label: 'Urgent' }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span style={{
        backgroundColor: config.bg,
        color: config.text,
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      plumbing: { bg: '#cff4fc', text: '#055160', label: 'Plumbing' },
      electrical: { bg: '#fff3cd', text: '#856404', label: 'Electrical' },
      carpentry: { bg: '#e7d4f5', text: '#3d2645', label: 'Carpentry' },
      other: { bg: '#e2e3e5', text: '#383d41', label: 'Other' }
    };
    const config = categoryConfig[category] || categoryConfig.other;
    return (
      <span style={{
        backgroundColor: config.bg,
        color: config.text,
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 style={{ fontWeight: 'bold' }}>Maintenance Management</h2>
          <p className="text-muted">Track and manage maintenance requests</p>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading maintenance requests...</div>}

      {!loading && maintenance.length === 0 && (
        <div className="alert alert-info">No maintenance requests with status: {filterStatus}</div>
      )}

      {!loading && maintenance.length > 0 && (
        <div className="space-y-3">
          {maintenance.map((item) => (
            <div key={item._id} className="card mb-3" style={{ borderLeft: '4px solid #ff9800' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="card-title mb-1">
                      <Wrench size={18} className="me-2" style={{ color: '#ff9800' }} />
                      {item.title || 'Maintenance Request'}
                    </h5>
                    {item.description && <p className="text-muted small mb-0">{item.description}</p>}
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <div className="row mt-3 small">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <strong>Category:</strong> {getCategoryBadge(item.category)}
                    </p>
                    <p className="mb-2">
                      <strong>Priority:</strong> {getPriorityBadge(item.priority)}
                    </p>
                    <p className="mb-2">
                      <strong>Resident:</strong> {item.createdBy?.name || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <strong>Unit ID:</strong> {item.createdBy?.unitId || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>Requested:</strong> {formatDate(item.createdAt)}
                    </p>
                    <p className="mb-2">
                      <strong>Budget:</strong> ₹{item.estimatedCost || 0}
                    </p>
                  </div>
                </div>

                {expandedId === item._id && (
                  <div className="mt-3 border-top pt-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select form-select-sm"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          >
                            <option value="">Select Status</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Priority</label>
                          <select
                            className="form-select form-select-sm"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Actual Cost (Optional)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Enter actual cost"
                        value={formData.actualCost}
                        onChange={(e) => setFormData({ ...formData, actualCost: e.target.value })}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Admin Notes</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        placeholder="Add notes..."
                        value={formData.adminNotes}
                        onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm flex-grow-1"
                        onClick={() => handleUpdateMaintenance(item._id)}
                        disabled={actionLoading}
                      >
                        Save Changes
                      </button>
                      <button
                        className="btn btn-secondary btn-sm flex-grow-1"
                        onClick={() => {
                          setExpandedId(null);
                          setFormData({ status: '', priority: '', adminNotes: '', actualCost: '' });
                        }}
                        disabled={actionLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {expandedId !== item._id && (
                  <button
                    className="btn btn-outline-primary btn-sm mt-3"
                    onClick={() => {
                      setExpandedId(item._id);
                      setFormData({
                        status: item.status,
                        priority: item.priority,
                        adminNotes: item.adminNotes || '',
                        actualCost: item.actualCost || ''
                      });
                    }}
                  >
                    Update Status
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMaintenance;
