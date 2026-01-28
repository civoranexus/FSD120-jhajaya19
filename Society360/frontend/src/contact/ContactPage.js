import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="simple-contact-container" style={{marginBottom: "10rem"}}>
      {/* Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Society360 Support Team</p>
      </div>

      <div className="contact-content">
        {/* Success Message */}
        {submitted && (
          <div className="success-message">
            <div className="success-check">✓</div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll contact you soon.</p>
          </div>
        )}

        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          
          <div className="info-cards">
            <div className="info-card">
              <div className="card-icon"><i class="fa fa-lg fa-envelope" aria-hidden="true"></i></div>
              <h3>Email</h3>
              <p>support@society360.com</p>
              <p>response within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="card-icon"><i class="fa fa-lg fa-phone" aria-hidden="true"></i></div>
              <h3>Phone</h3>
              <p>+91-7350 XXXXX</p>
              <p>Mon-Fri, 9AM-6PM IST</p>
            </div>

            <div className="info-card">
              <div className="card-icon"><i class="fa fa-lg fa-building" aria-hidden="true"></i></div>
              <h3>Address</h3>
              <p>Civora Nexus Pvt. Ltd.</p>
              <p>Sangamner, Maharashtra</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h3>Quick Support</h3>
          <div className="links">
            <a href="#" className="link-item">
              <span><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
              <span>Submit Maintenance Request</span>
            </a>
            <a href="#" className="link-item">
              <span><i class="fa fa-money" aria-hidden="true"></i></span>
              <span>Billing Support</span>
            </a>
            <a href="#" className="link-item">
              <span><i class="fa fa-lock" aria-hidden="true"></i></span>
              <span>Security Issues</span>
            </a>
            <a href="#" className="link-item">
              <span><i class="fa fa-book" aria-hidden="true"></i></span>
              <span>User Guides</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;