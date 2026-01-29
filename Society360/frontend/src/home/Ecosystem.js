import React from "react";

function Ecosystem() {
  return (
    <div className="ecoContainer py-4">
      <div className="row mt-5">
        <h1 style={{ fontSize: "50px" }} className="text-center">
          The Ecosystem
        </h1>
        <p className="mt-2 fs-4 text-center mb-5">
          Six powerful modules working in perfect synchronization.
        </p>
        <div className="col-md-4 mb-4">
          <div
            className="card px-3"
            style={{ width: "25rem", marginLeft: "40px" }}
          >
            <div className="card-body">
              <i class="fa fa-lg fa-user mt-4 mb-3" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                User Login & Profiles
              </h4>
              <p className="card-text mb-4">
                Secure sign-up and login for residents, admins, and staff.
                Role-based access ensures data privacy and security.
              </p>
              <a href="" style={{ textDecoration: "none" }}>
                Explore module{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card px-3" style={{ width: "25rem" ,  marginLeft: "40px"  }}>
            <div className="card-body">
              <i class="fa fa-lg fa-thumbs-up mt-4 mb-3" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                Visitor Management
              </h4>
              <p className="card-text mb-4">
                Pre-approve guests and track entry/exit in real-time. Digital
                logs for enhanced community security.
              </p>
              <a href="" style={{ textDecoration: "none" }}>
                Explore module{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card px-3" style={{ width: "25rem",  marginLeft: "40px" }}>
            <div className="card-body">
              <i class="fa fa-lg fa-wrench mt-4 mb-4" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                Maintenance & Complaints
              </h4>
              <p className="card-text mb-4">
                Submit repair requests, track status, and rate service quality
                directly from your dashboard.
              </p>
              <a href="" style={{ textDecoration: "none" }}>
                Explore module{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="card px-3"
            style={{ width: "25rem", marginLeft: "40px" }}
          >
            <div className="card-body">
              <i
                class="fa fa-lg fa-credit-card mt-4 mb-4"
                aria-hidden="true"
              ></i>
              <h4 className="card-title mb-3">Finance & Billing</h4>
              <p className="card-text mb-4">
                Automated monthly billing with a simulated payment gateway. View
                history and download digital receipts.
              </p>
              <a href="" style={{ textDecoration: "none" }}>
                Explore module{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card px-3" style={{ width: "25rem",  marginLeft: "40px" }}>
            <div className="card-body">
              <i class="fa fa-bell fa-lg mt-4 mb-4" aria-hidden="true"></i>
              <h4 className="card-title mb-3">Smart Notifications</h4>
              <p className="card-text mb-4">
                Instant alerts for bills, visitors, and important society
                updates.
              </p>
              <a href="" style={{ textDecoration: "none" }}>
                Explore module{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ecosystem;
