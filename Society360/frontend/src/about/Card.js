import React from "react";

function Card() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4 mt-5">
          <div
            className="card px-3"
            style={{ width: "25rem", marginLeft: "40px" }}
          >
            <div className="card-body">
              <i class="fa fa-lg fa-building my-4" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                Resident
              </h4>
              <p className="card-text mb-5">
                Access personal dashboard, pay bills, pre-approve visitors, and connect with neighbors.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 mt-5">
          <div
            className="card px-3"
            style={{ width: "25rem", marginLeft: "40px" }}
          >
            <div className="card-body">
              <i class="fa fa-lg fa-lock my-4" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                Management / Admin
              </h4>
              <p className="card-text mb-4">
                Oversee operations, manage users, view financial reports, and broadcast announcements.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 mt-5">
          <div
            className="card px-3"
            style={{ width: "25rem", marginLeft: "40px" }}
          >
            <div className="card-body">
               <i class="fa fa-lg fa-shield my-4" aria-hidden="true"></i>
              <h4 className="card-title mb-3" style={{ marginRight: "1rem" }}>
                Security / Staff
              </h4>
              <p className="card-text mb-5">
                Log visitor entries, update maintenance task status, and ensure premise security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
