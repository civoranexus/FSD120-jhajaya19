import React, {useState} from "react";
import { createMaintenance } from "../services/maintenanceService";

function MaintenanceReq({ onMaintenanceCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const categories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#38a169' },
    { value: 'medium', label: 'Medium', color: '#d69e2e' },
    { value: 'high', label: 'High', color: '#dd6b20' },
    { value: 'urgent', label: 'Urgent', color: '#e53e3e' }
  ];

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await createMaintenance(formData);
      
      setSuccess('Maintenance request submitted successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'other',
        priority: 'medium'
      });

      if (onMaintenanceCreated) {
        onMaintenanceCreated(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit maintenance request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container border p-2 my-4" style={{ borderRadius: "1rem" }}>
      <div className="row p-4">
        <h3 className="mb-4">Submit Maintenance Request</h3>

        {error && (
          <div>{error}</div>
        )}
      
        {success && (
          <div>{success}</div>
        )}

        <form className="row" onSubmit={handleSubmit}>
          <div className="mb-3 col-6">
            <label for="exampleInputVisitor1" className="form-label">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              id="exampleInputVisitor1"
            />
          </div>
          <div className="mb-3 col-6">
            <label for="unit-no" className="form-label" >
              Unit Number
            </label>
            <input type="text" className="form-control" id="unit-no" name="unitId" value={formData.unitId} onChange={handleChange}/>
          </div>
          <div className="mb-3 col-6">
            <label for="category" className="form-label" >
              Category
            </label>
            <select className="form-select" aria-label="Default select example" name="category"
            value={formData.category}
            onChange={handleChange}>
              <option value="plumbing">
                Plumbing
              </option>
              <option value="electrical">Electrical</option>
              <option value="carpentry">Carpentry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3 col-6">
            <label for="priority" className="form-label">
              Priority
            </label>
            <select className="form-select" aria-label="Default select example" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">
                Medium
              </option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description" value={formData.description} onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary col-auto mx-3">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary col-auto"
            disabled
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default MaintenanceReq;
