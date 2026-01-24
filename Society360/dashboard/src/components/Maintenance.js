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
        setMaintenance(response.maintenance || []);
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

    const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#d69e2e', bg: '#fefcbf', text: 'Pending' },
      assigned: { color: '#3182ce', bg: '#bee3f8', text: 'Assigned' },
      in_progress: { color: '#805ad5', bg: '#e9d8fd', text: 'In Progress' },
      completed: { color: '#38a169', bg: '#c6f6d5', text: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span style={{
        backgroundColor: config.bg, color: config.color,padding: '4px 12px',borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase'
      }}>
        {config.text}
      </span>
    );
   };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { color: '#38a169', text: 'Low' },
      medium: { color: '#d69e2e', text: 'Medium' },
      high: { color: '#dd6b20', text: 'High' },
      urgent: { color: '#e53e3e', text: 'Urgent' }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span style={{ color: config.color, fontWeight: '600'}}>
        {config.text}
      </span>
    );
  };

    const getCategoryBadge = (category) => {
    const categoryConfig = {
      plumbing: { color: '#3182ce', text: 'Plumbing' },
      electrical: { color: '#d69e2e', text: 'Electrical' },
      carpentry: { color: '#805ad5', text: 'Carpentry' },
      other: { color: '#718096', text: 'Other' }
    };
    const config = categoryConfig[category] || categoryConfig.other;
    return (
      <span style={{ color: config.color, fontWeight: '600' }}>
        {config.text}
      </span>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Maintenance & Complaints
        <button class="btn btn-primary" href="" role="button" style={{marginLeft: "35rem"}} onClick={toggleVisibility}><i class="fa fa-plus text-white m-2" aria-hidden="true"></i>
         {isVisible ? "Hide form" : "New Request"}
         </button>
        </h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Submit and track maintenance requests
        </p>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search requests..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        {isVisible && <MaintenanceReq setIsVisible={setIsVisible} />}

        <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Leaking Faucet in Kitchen
                  <span class="badge rounded-pill text-bg-primary" style={{marginLeft: "1rem"}}>in-progress</span>
                  <span class="badge rounded-pill text-bg-danger" style={{marginLeft: "1rem"}}>high</span>
                  <span class="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>plumbing</span>
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
                  <span class="badge rounded-pill text-bg-success" style={{marginLeft: "1rem"}}>resolved</span>
                  <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1rem"}}>medium</span>
                  <span class="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>electrical</span>
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
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
