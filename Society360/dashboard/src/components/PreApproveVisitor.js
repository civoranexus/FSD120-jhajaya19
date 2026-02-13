import React, {useState} from "react";
import { createVisitor } from '../services/visitorService';

function PreApproveVisitor({setIsVisible , onSuccess}) {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    purpose: 'personal',
    expectedEntryTime: '',
  });

  const [validated, setValidated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.visitorName.trim()) {
      setError('Visitor name is required');
      return;
    }
    if (!formData.visitorPhone.trim()) {
      setError('Phone number is required');
      return;
    }
    if (!formData.expectedEntryTime) {
      setError('Expected entry time is required');
      return;
    }
    
    setLoading(true);
    setError('');
    setValidated(true);

    try {
      const response = await createVisitor(formData);
      console.log('Visitor created successfully:', response);
      
      // Reset form
      setFormData({
        visitorName: '',
        visitorPhone: '',
        purpose: 'personal',
        expectedEntryTime: '',
      });
      setValidated(false);
      
      if (onSuccess) onSuccess();
      alert('Visitor request submitted successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to submit visitor request';
      console.error('Full error:', err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // // Set default entry time to now + 1 hour
  const getDefaultTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="container border p-2 my-4" style={{borderRadius: "1rem"}}>
        <div className="row p-4">
        <h3 className="mb-4">Pre-approve New Visitor</h3>
        {error && <div className="alert alert-error">{error}</div>}
      <form className="row" onSubmit={handleSubmit}>
        <div className="mb-3 col-6">
          <label htmlFor="visitorName" className="form-label">
            Visitor Name *
          </label>
          <input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            className="form-control"
            id="visitorName"
            placeholder="Enter visitor name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="phone" className="form-label">
            Phone Number *
          </label>
          <input
            type="tel"
            name="visitorPhone"
            value={formData.visitorPhone}
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="purpose" className="form-label">
            Purpose of Visit
          </label>
          <select
            name="purpose"
            value={formData.purpose}
            className="form-control"
            id="purpose"
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="delivery">Delivery</option>
            <option value="service">Service</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="expectedEntryTime">Expected Entry Time *</label>
          <input
            type="datetime-local"
            name="expectedEntryTime"
            id="expectedEntryTime"
            value={formData.expectedEntryTime || getDefaultTime()}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
        <button type="submit" className="btn btn-primary col-auto mx-3">
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
        <button type="button" class="btn btn-outline-primary col-auto" disabled>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default PreApproveVisitor;
