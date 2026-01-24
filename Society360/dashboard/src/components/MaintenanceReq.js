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
            <label for="unit-no" class="form-label" >
              Unit Number
            </label>
            <input type="text" class="form-control" id="unit-no" name="unitId" value={formData.unitId} onChange={handleChange}/>
          </div>
          <div className="mb-3 col-6">
            <label for="category" class="form-label" >
              Category
            </label>
            <select className="form-select" aria-label="Default select example" name="category"
            value={formData.category}
            onChange={handleChange}>
              <option value="1" selected>
                Plumbing
              </option>
              <option value="2">Electrical</option>
              <option value="3">Cleaning</option>
              <option value="4">Other</option>
            </select>
          </div>
          <div class="mb-3 col-6">
            <label for="unit-no" class="form-label" name="priority">
              Priority
            </label>
            <select class="form-select" aria-label="Default select example" value={formData.priority} onChange={handleChange}>
              <option value="1">Low</option>
              <option value="2" selected>
                Medium
              </option>
              <option value="3">High</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
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
            class="btn btn-outline-primary col-auto"
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
