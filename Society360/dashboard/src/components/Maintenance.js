import React, {useState, useEffect} from "react";
import MaintenanceReq from "./MaintenanceReq";
import { getAllMaintenance } from "../services/maintenanceService";

function Maintenance() {
  const [isVisible, setIsVisible] = useState(false);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      fetchMaintenance();
  }, []);
  
    const fetchMaintenance = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Fetching all maintenance requests...');
        const response = await getAllMaintenance();
        console.log('Maintenance response:', response);
        setMaintenance(response.data || []);
      } catch (err) {
        console.error('Error fetching maintenance:', err);
        setError(err.response?.data?.message || 'Failed to fetch maintenance');
      } finally {
        setLoading(false);
      }
    };

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    }

    const handleMaintenanceAdded = () => {
     fetchMaintenance();
     setIsVisible(false);
    };

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

    const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#fff', bg: '#EAB308', text: 'Pending' },
      assigned: { color: '#fff', bg: '#805ad5', text: 'Assigned' },
      in_progress: { color: '#fff', bg: '#007AFF', text: 'In Progress' },
      completed: { color: '#fff', bg: '#28A745', text: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span style={{
        backgroundColor: config.bg, color: config.color,padding: '3px 10px',borderRadius: '20px', fontSize: '12px', fontWeight: '600'
      }}>
        {config.text}
      </span>
    );
   };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { color: "#fff", bg: '#2c8656ff', text: 'Low' },
      medium: { color: "#fff", bg: '#d69e2e', text: 'Medium' },
      high: { color: "#fff", bg: '#dd6b20', text: 'High' },
      urgent: { color: "#fff", bg: '#e53e3e', text: 'Urgent' }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span style={{backgroundColor: config.bg, color: config.color, padding: '3px 10px',borderRadius: '20px', fontSize: '12px', fontWeight: '600'}}>
        {config.text}
      </span>
    );
  };

    const getCategoryBadge = (category) => {
    const categoryConfig = {
      plumbing: { color: "#fff", bg: '#3182ce', text: 'Plumbing' },
      electrical: { color: "#fff", bg: '#d69e2e', text: 'Electrical' },
      carpentry: { color: "#fff", bg: '#805ad5', text: 'Carpentry' },
      other: { color: "#fff", bg: '#718096', text: 'Other' }
    };
    const config = categoryConfig[category] || categoryConfig.other;
    return (
      <span style={{backgroundColor: config.bg, color: config.color, padding: '3px 10px',borderRadius: '20px', fontSize: '12px',fontWeight: '600' }}>
        {config.text}
      </span>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Maintenance & Complaints
        <button className="btn btn-primary" role="button" style={{marginLeft: "35rem"}} onClick={toggleVisibility}><i className="fa fa-plus text-white m-2" aria-hidden="true"></i>
         {isVisible ? "Hide form" : "New Request"}
         </button>
        </h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Submit and track maintenance requests
        </p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search requests..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        {isVisible && <MaintenanceReq setIsVisible={setIsVisible} onMaintenanceCreated={handleMaintenanceAdded}/>}

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {loading && <div className="alert alert-info mt-3">Loading maintenances...</div>}

        <div className="row mt-4">
          {!loading && maintenance && maintenance.length > 0 ? (
            maintenance.map((maintenanceItem) => (
              <div key={maintenanceItem._id} className="card px-3 mb-3" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    {maintenanceItem.title}{" "}
                    <span
                      className={`badge rounded-pill ${getStatusBadge(maintenanceItem.status)}`}
                      style={{ marginLeft: "1rem" }}
                    >
                      {getStatusBadge(maintenanceItem.status)}
                    </span>
                    <span
                      className={`badge rounded-pill ${getPriorityBadge(maintenanceItem.priority)}`}
                      style={{ marginLeft: "1rem" }}
                    >
                      {getPriorityBadge(maintenanceItem.priority)}
                    </span>
                    <span
                      className={`badge rounded-pill ${getCategoryBadge(maintenanceItem.category)}`}
                      style={{ marginLeft: "1rem" }}
                    >
                      {getCategoryBadge(maintenanceItem.category)}
                    </span>
                  </h5>
                  <div className="text-muted">
                    <p>{maintenanceItem.description}</p>
                    <span>Unit: {maintenanceItem.unitId}</span>
                    <span style={{ marginLeft: "30rem" }}>Created: {formatDate(maintenanceItem.createdAt)}</span>
                    <br />
                    <span>Updated: {formatDate(maintenanceItem.updatedAt)}</span>
                    <span style={{ marginLeft: "25rem" }}>
                      Assigned to: {maintenanceItem.assignedTo ? maintenanceItem.assignedTo.name : 'Unassigned'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <div className="alert alert-info mt-3">No maintenances found</div>
          )}
        </div>

        {/* <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Leaking Faucet in Kitchen
                  <span className="badge rounded-pill text-bg-primary" style={{marginLeft: "1rem"}}>in-progress</span>
                  <span className="badge rounded-pill text-bg-danger" style={{marginLeft: "1rem"}}>high</span>
                  <span className="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>plumbing</span>
                </h5>
                <div className="text-muted">
                  <p>The kitchen faucet has been leaking for the past two days</p>
                  <span>Unit: A-101</span>
                  <span style={{ marginLeft: "33rem" }}>Created: 5/1/2026</span>
                  <br />
                  <span>Updated: 6/1/2026</span>
                  <span style={{ marginLeft: "30rem" }}>
                    Assigned to staff
                  </span>
                </div>
                
              </div>
            </div>
            <div className="card px-3 mt-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  AC Not Cooling
                  <span className="badge rounded-pill text-bg-success" style={{marginLeft: "1rem"}}>resolved</span>
                  <span className="badge rounded-pill text-bg-warning" style={{marginLeft: "1rem"}}>medium</span>
                  <span className="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>electrical</span>
                </h5>
                <div className="text-muted">
                  <p>Air conditioner in bedroom is running but not cooling properly</p>
                  <span>Unit: A-101 </span>
                  <span style={{ marginLeft: "33rem" }}>Created: 3/1/2026</span>
                  <br />
                  <span>Updated: 4/1/2026</span>
                  <span style={{ marginLeft: "30rem" }}>
                    Assigned to staff
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Maintenance;
