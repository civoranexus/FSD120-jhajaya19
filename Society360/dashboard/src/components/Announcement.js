import React, { useState, useEffect } from "react";
import { getAnnouncements } from "../services/AdminService";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await getAnnouncements();
      setAnnouncements(response.data || []);
      setFilteredAnnouncements(response.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load announcements");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = announcements.filter(
      (ann) =>
        ann.title.toLowerCase().includes(term) ||
        ann.content.toLowerCase().includes(term)
    );
    setFilteredAnnouncements(filtered);
  };

  const getPriorityBadgeColor = (priority) => {
    const colors = {
      low: "text-bg-success",
      medium: "text-bg-warning",
      high: "text-bg-danger",
      urgent: "text-bg-danger"
    };
    return colors[priority] || "text-bg-secondary";
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      general: "text-bg-primary",
      maintenance: "text-bg-warning",
      event: "text-bg-success",
      emergency: "text-bg-danger",
      payment: "text-bg-info",
      meeting: "text-bg-secondary"
    };
    return colors[category] || "text-bg-secondary";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Community Announcements</h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Stay updated with society news and events
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={handleSearch}
            aria-describedby="basic-addon1"
          />
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && filteredAnnouncements.length === 0 && (
          <div className="alert alert-info">No announcements available</div>
        )}

        <div className="row">
          <div className="row mb-4 mt-4">
            {filteredAnnouncements.map((announcement) => (
              <div className="card px-3 mt-4" style={{ width: "100%" }} key={announcement._id}>
                <div className="card-body">
                  <h4 className="card-title mb-3" style={{ fontWeight: "bold" }}>
                    <i
                      className="fa fa-bell-o fa-lg"
                      aria-hidden="true"
                      style={{ marginRight: "0.8rem" }}
                    ></i>
                    {announcement.title}
                  </h4>
                  <div style={{ marginLeft: "3rem" }}>
                    <span
                      className={`badge rounded-pill ${getCategoryBadgeColor(announcement.category)}`}
                    >
                      {announcement.category}
                    </span>
                    <span
                      className={`badge rounded-pill ${getPriorityBadgeColor(announcement.priority)}`}
                      style={{ marginLeft: "1.5rem" }}
                    >
                      {announcement.priority} priority
                    </span>
                  </div>
                  <div className="text-muted" style={{ marginLeft: "3rem" }}>
                    <p className="mt-2 fs-5">{announcement.content}</p>
                    <p className="mb-2">
                      <small>Posted by: {announcement.postedBy?.name || "Admin"}</small>
                    </p>
                    <p>
                      <small>Posted on: {formatDate(announcement.createdAt)}</small>
                    </p>
                    {announcement.eventDate && (
                      <p>
                        <small>Valid until: {formatDate(announcement.eventDate)}</small>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
