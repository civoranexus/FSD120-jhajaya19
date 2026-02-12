import React, { useState, useEffect } from "react";
import { getAllVisitors, approveVisitor, rejectVisitor } from "../services/AdminService";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";

function AdminVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, [filterStatus]);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllVisitors({ status: filterStatus });
      setVisitors(response.data || []);
    } catch (err) {
      console.error('Error fetching visitors:', err);
      setError(err.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (visitorId) => {
    try {
      setActionLoading(true);
      await approveVisitor(visitorId);
      fetchVisitors();
      alert('Visitor approved successfully!');
    } catch (err) {
      alert(err.message || 'Failed to approve visitor');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (visitorId) => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      setActionLoading(true);
      await rejectVisitor(visitorId, rejectReason);
      setRejectReason('');
      setSelectedVisitor(null);
      fetchVisitors();
      alert('Visitor rejected successfully!');
    } catch (err) {
      alert(err.message || 'Failed to reject visitor');
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
      approved: { bg: '#d4edda', text: '#155724', label: 'Approved' },
      rejected: { bg: '#f8d7da', text: '#721c24', label: 'Rejected' },
      checked_in: { bg: '#d1ecf1', text: '#0c5460', label: 'Checked In' },
      checked_out: { bg: '#e2e3e5', text: '#383d41', label: 'Checked Out' }
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

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 style={{ fontWeight: 'bold' }}>Visitor Management</h2>
          <p className="text-muted">Manage and approve visitor requests</p>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading visitors...</div>}

      {!loading && visitors.length === 0 && (
        <div className="alert alert-info">No visitors with status: {filterStatus}</div>
      )}

      {!loading && visitors.length > 0 && (
        <div className="row">
          {visitors.map((visitor) => (
            <div key={visitor._id} className="col-md-6 mb-3">
              <div className="card h-100" style={{ borderLeft: '4px solid #007bff' }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">
                      <User size={18} className="me-2" style={{ color: '#007bff' }} />
                      {visitor.visitorName}
                    </h5>
                    {getStatusBadge(visitor.status)}
                  </div>

                  <div className="mt-3">
                    <p className="mb-2">
                      <strong>Phone:</strong> {visitor.visitorPhone}
                    </p>
                    <p className="mb-2">
                      <strong>Purpose:</strong> <span className="badge bg-info">{visitor.purpose}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Expected Entry:</strong> {formatDate(visitor.expectedEntryTime)}
                    </p>
                    <p className="mb-2">
                      <strong>Resident:</strong> {visitor.residentId?.name || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>Unit ID:</strong> {visitor.unitId}
                    </p>
                  </div>

                  {visitor.status === 'pending' && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm flex-grow-1"
                        onClick={() => handleApprove(visitor._id)}
                        disabled={actionLoading}
                      >
                        <CheckCircle size={16} className="me-2" />
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-grow-1"
                        onClick={() => setSelectedVisitor(visitor._id)}
                        disabled={actionLoading}
                      >
                        <XCircle size={16} className="me-2" />
                        Reject
                      </button>
                    </div>
                  )}

                  {selectedVisitor === visitor._id && (
                    <div className="mt-3 border-top pt-3">
                      <textarea
                        className="form-control mb-2"
                        rows="2"
                        placeholder="Reason for rejection..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => handleReject(visitor._id)}
                          disabled={actionLoading}
                        >
                          Confirm Reject
                        </button>
                        <button
                          className="btn btn-secondary btn-sm flex-grow-1"
                          onClick={() => {
                            setSelectedVisitor(null);
                            setRejectReason('');
                          }}
                          disabled={actionLoading}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminVisitors;
