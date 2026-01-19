import React, {useState} from "react";
import { createVisitor } from '../services/visitorService';

function PreApproveVisitor({setIsVisible , onSuccess}) {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    purpose: 'personal',
    expectedEntryTime: '',
    unitId: '',
  });

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
    setLoading(true);
    setError('');

    try {
      await createVisitor(formData);
      // Reset form
      setFormData({
        visitorName: '',
        visitorPhone: '',
        purpose: 'personal',
        expectedEntryTime: '',
        unitId: '',
      });
      
      if (onSuccess) onSuccess();
      alert('Visitor request submitted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit visitor request');
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
          <label for="exampleInputVisitor1" className="form-label">
            Visitor Name
          </label>
          <input
            type="text"
            name="visitorName"
            className="form-control"
            id="exampleInputVisitor1"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            name="visitorPhone"
            class="form-control"
            id="phone"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="purpose" class="form-label">
            Purpose of Visit
          </label>
          <input
            type="text"
            name="purpose"
            class="form-control"
            id="purpose"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="unit-no" class="form-label">
            Unit Number
          </label>
          <input
            type="text"
            name="unitId"
            class="form-control"
            id="unit-no"
            onChange={handleChange}
          />
        </div>
          <div className="mb-3 col-6">
            <label>Expected Entry Time *</label>
            <input
              type="datetime-local"
              name="expectedEntryTime"
              value={formData.expectedEntryTime || getDefaultTime()}
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
