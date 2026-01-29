import React from "react";

function Announcement() {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Community Announcements</h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Stay updated with society news and events
        </p>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search announcements..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h4 className="card-title mb-3" style={{fontWeight: "bold"}}>
                  <i class="fa fa-bell-o fa-lg" aria-hidden="true" style={{marginRight: "0.8rem"}}></i> Community Pool Maintenance
                </h4>
                <span class="badge rounded-pill text-bg-danger" style={{marginLeft: "3rem"}}>maintenance</span>
                <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1.5rem"}}>high priorty</span>
                <div className="text-muted" style={{marginLeft: "3rem"}}>
                  <p className="mt-2 fs-5">The community pool will be closed for maintenance from January 10-12. We apologize for any inconvenience.</p>
                  <p>Valid until: 12/1/2026</p>
                </div>
                
              </div>
            </div>
            <div className="card px-3 mt-4" style={{ width: "100%" }}>
              <div className="card-body">
                <h4 className="card-title mb-3" style={{fontWeight: "bold"}}>
                  <i class="fa fa-bell-o fa-lg" aria-hidden="true" style={{marginRight: "0.8rem"}}></i> Annual Society Meeting
                </h4>
                <span class="badge rounded-pill text-bg-success" style={{marginLeft: "3rem"}}>event</span>
                <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1.5rem"}}>medium priorty</span>
                <div className="text-muted" style={{marginLeft: "3rem"}}>
                  <p className="mt-2 fs-5">Join us for the annual general meeting on January 20th at 6 PM in the community hall. All residents are encouraged to attend.</p>
                  <p>Valid until: 20/1/2026</p>
                </div>
                
              </div>
            </div>
            <div className="card px-3 mt-4 mb-5" style={{ width: "100%" }}>
              <div className="card-body">
                <h4 className="card-title mb-3" style={{fontWeight: "bold"}}>
                  <i class="fa fa-bell-o fa-lg" aria-hidden="true" style={{marginRight: "0.8rem"}}></i> New Security Protocols
                </h4>
                <span class="badge rounded-pill text-bg-primary" style={{marginLeft: "3rem"}}>general</span>
                <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1.5rem"}}>high priorty</span>
                <div className="text-muted" style={{marginLeft: "3rem"}}>
                  <p className="mt-2 fs-5">Enhanced visitor management system is now active. Please pre-approve all visitors through the portal.</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
