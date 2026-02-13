import React, { useState } from "react";
import { createAnnouncement } from "../services/AdminService";
import { Bell, Send } from "lucide-react";

function AdminAnnouncements() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    eventDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const announcementData = {
        ...formData,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined
      };

      await createAnnouncement(announcementData);

      setSuccess('Announcement created successfully!');
      setFormData({
        title: '',
        content: '',
        category: 'general',
        priority: 'medium',
        eventDate: ''
      });

      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#d1e7dd',
      medium: '#fff3cd',
      high: '#f8d7da',
      urgent: '#f5c2c7'
    };
    return colors[priority] || colors.medium;
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: '#cfe2ff',
      maintenance: '#fff3cd',
      event: '#d1e7dd',
      emergency: '#f8d7da',
      payment: '#cff4fc',
      meeting: '#e7d4f5'
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-body p-4">
              <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                <Bell size={28} className="me-2" style={{ color: '#0dcaf0' }} />
                Create Announcement
              </h2>
              <p className="text-muted mb-4">
                Post announcements to notify residents about important updates
              </p>

              {error && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
              {success && <div className="alert alert-success alert-dismissible fade show">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="title">
                    <strong>Title *</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter announcement title"
                    maxLength="200"
                  />
                  <small className="text-muted">Max 200 characters</small>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="content">
                    <strong>Content *</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter announcement content"
                    rows="6"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="category">
                      <strong>Category *</strong>
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      style={{ backgroundColor: getCategoryColor(formData.category) }}
                    >
                      <option value="general">General</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="event">Event</option>
                      <option value="emergency">Emergency</option>
                      <option value="payment">Payment</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="priority">
                      <strong>Priority *</strong>
                    </label>
                    <select
                      className="form-select"
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      style={{ backgroundColor: getPriorityColor(formData.priority) }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="eventDate">
                    <strong>Event Date (Optional)</strong>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Set if announcement is for a specific event</small>
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={loading}
                  >
                    <Send size={18} className="me-2" />
                    {loading ? 'Publishing...' : 'Publish Announcement'}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-outline-secondary"
                    onClick={() => setFormData({
                      title: '',
                      content: '',
                      category: 'general',
                      priority: 'medium',
                      eventDate: ''
                    })}
                    disabled={loading}
                  >
                    Clear
                  </button>
                </div>
              </form>

              {/* Preview */}
              {formData.title && (
                <div className="mt-4 border-top pt-4">
                  <h5>Preview</h5>
                  <div className="card" style={{ backgroundColor: getCategoryColor(formData.category) }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title">{formData.title || 'Your title here'}</h6>
                        <small>
                          <span 
                            className="badge"
                            style={{
                              backgroundColor: formData.priority === 'low' ? '#d1e7dd' :
                                              formData.priority === 'medium' ? '#fff3cd' :
                                              formData.priority === 'high' ? '#f8d7da' : '#f5c2c7'
                            }}
                          >
                            {formData.priority}
                          </span>
                        </small>
                      </div>
                      <p className="card-text small text-muted">{formData.content || 'Your content here'}</p>
                      {formData.eventDate && (
                        <p className="card-text small">
                          <strong>Date:</strong> {new Date(formData.eventDate).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncements;
