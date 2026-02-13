import React, { useState, useEffect } from "react";
import { getAllBilling, generateBills } from "../services/AdminService";
import { DollarSign, FileText } from "lucide-react";

function AdminBilling() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [generatingBills, setGeneratingBills] = useState(false);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchBills();
  }, [filterStatus]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllBilling({ status: filterStatus });
      setBills(response.data || []);
    } catch (err) {
      console.error('Error fetching bills:', err);
      setError(err.message || 'Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBills = async () => {
    if (!month) {
      alert('Please select a month');
      return;
    }

    try {
      setGeneratingBills(true);
      const [year, monthNum] = month.split('-');
      await generateBills({ year: parseInt(year), month: parseInt(monthNum) });
      fetchBills();
      alert('Bills generated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to generate bills');
    } finally {
      setGeneratingBills(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: '#fff3cd', text: '#856404', label: 'Pending' },
      paid: { bg: '#d1e7dd', text: '#0f5132', label: 'Paid' },
      overdue: { bg: '#f8d7da', text: '#842029', label: 'Overdue' }
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

  const stats = {
    total: bills.reduce((sum, bill) => sum + (bill.amount || 0), 0),
    pending: bills.filter(b => b.status === 'pending').length,
    paid: bills.filter(b => b.status === 'paid').length,
    overdue: bills.filter(b => b.status === 'overdue').length
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 style={{ fontWeight: 'bold' }}>Billing Management</h2>
          <p className="text-muted">Manage resident bills and payments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ borderLeft: '4px solid #28a745' }}>
            <div className="card-body">
              <p className="text-muted small mb-1">Paid Bills</p>
              <h4 style={{ color: '#28a745' }}>{stats.paid}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ borderLeft: '4px solid #ffc107' }}>
            <div className="card-body">
              <p className="text-muted small mb-1">Pending Bills</p>
              <h4 style={{ color: '#ffc107' }}>{stats.pending}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ borderLeft: '4px solid #dc3545' }}>
            <div className="card-body">
              <p className="text-muted small mb-1">Overdue Bills</p>
              <h4 style={{ color: '#dc3545' }}>{stats.overdue}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ borderLeft: '4px solid #0dcaf0' }}>
            <div className="card-body">
              <p className="text-muted small mb-1">Total Amount</p>
              <h4 style={{ color: '#0dcaf0' }}>₹{stats.total.toLocaleString()}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Bills Section */}
      <div className="card mb-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card-body">
          <h5 className="card-title mb-3">
            <FileText size={20} className="me-2" style={{ color: '#0dcaf0' }} />
            Generate Bills
          </h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Select Month</label>
              <input
                type="month"
                className="form-control"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={handleGenerateBills}
                disabled={generatingBills}
              >
                {generatingBills ? 'Generating...' : 'Generate Bills for Selected Month'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Bills List */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading bills...</div>}

      {!loading && bills.length === 0 && (
        <div className="alert alert-info">No bills with status: {filterStatus}</div>
      )}

      {!loading && bills.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th>Bill ID</th>
                <th>Unit</th>
                <th>Resident</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Issued Date</th>
                <th>Due Date</th>
                <th>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id}>
                  <td>
                    <small style={{ color: '#0dcaf0', fontWeight: '600' }}>
                      {bill._id?.slice(-6) || 'N/A'}
                    </small>
                  </td>
                  <td>{bill.unitId?.unitNumber || 'N/A'}</td>
                  <td>{bill.residentId?.name || 'N/A'}</td>
                  <td>
                    <strong>₹{(bill.amount || 0).toLocaleString()}</strong>
                  </td>
                  <td>{getStatusBadge(bill.status)}</td>
                  <td>{formatDate(bill.issuedDate)}</td>
                  <td>{formatDate(bill.dueDate)}</td>
                  <td>{bill.paidDate ? formatDate(bill.paidDate) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminBilling;
