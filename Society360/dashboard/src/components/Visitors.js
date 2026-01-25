import React, { useState, useEffect } from "react";
import PreApproveVisitor from "./PreApproveVisitor";
import { getAllVisitors } from "../services/visitorService";

function Visitors() {
  const [isVisible, setIsVisible] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching all visitors...');
      const response = await getAllVisitors();
      console.log('Visitors response:', response);
      setVisitors(response.visitors || []);
    } catch (err) {
      console.error('Error fetching visitors:', err);
      setError(err.response?.data?.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleVisitorAdded = () => {
    fetchVisitors();
    setIsVisible(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
 
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'text-bg-warning';
      case 'approved': return 'text-bg-success';
      case 'rejected': return 'text-bg-danger';
      case 'checked_in': return 'text-bg-info';
      case 'checked_out': return 'text-bg-secondary';
      default: return 'text-bg-secondary';
    }
  };

  return (
    <div className="container">
      <div className="row"> 
        <h1 style={{ fontWeight: "bold" }}>
          Visitor Management
          <button
            className="btn btn-primary"
            role="button"
            style={{ marginLeft: "43rem" }}
            onClick={toggleVisibility}
          >
            <i className="fa fa-user-o text-white m-2" aria-hidden="true"></i>
            {isVisible ? "Hide form" : "Pre Approve Visitor"}
          </button>
        </h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Pre-approve and track visitor entry/exit
        </p>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, phone and unit number..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        {isVisible && <PreApproveVisitor setIsVisible={setIsVisible} onSuccess={handleVisitorAdded} />}

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {loading && <div className="alert alert-info mt-3">Loading visitors...</div>}

        <div className="row mt-4">
          {!loading && visitors && visitors.length > 0 ? (
            visitors.map((visitor) => (
              <div key={visitor._id} className="card px-3 mb-3" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    {visitor.visitorName}{" "}
                    <span
                      className={`badge rounded-pill ${getStatusBadgeClass(visitor.status)}`}
                      style={{ marginLeft: "1rem" }}
                    >
                      {visitor.status}
                    </span>
                  </h5>
                  <div className="text-muted">
                    <span>Phone: {visitor.visitorPhone}</span>
                    <span style={{ marginLeft: "30rem" }}>Unit: {visitor.unitId}</span>
                    <br />
                    <span>Purpose: {visitor.purpose}</span>
                    <span style={{ marginLeft: "25rem" }}>
                      Entry: {formatDate(visitor.expectedEntryTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <div className="alert alert-info mt-3">No visitors found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Visitors;
