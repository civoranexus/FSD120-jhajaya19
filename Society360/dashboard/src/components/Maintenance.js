import React from "react";

function Maintenance() {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Maintenance & Complaints
        <a class="btn btn-primary" href="" role="button" style={{marginLeft: "35rem"}}><i class="fa fa-plus text-white m-2" aria-hidden="true"></i> New Request</a>
        </h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Submit and track maintenance requests
        </p>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search requests..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Leaking Faucet in Kitchen
                  <span class="badge rounded-pill text-bg-primary" style={{marginLeft: "1rem"}}>in-progress</span>
                  <span class="badge rounded-pill text-bg-danger" style={{marginLeft: "1rem"}}>high</span>
                  <span class="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>plumbing</span>
                </h5>
                <div className="text-muted">
                  <p>The kitchen faucet has been leaking for the past two days</p>
                  <span>Unit: A-101</span>
                  <span style={{ marginLeft: "33rem" }}>Created: 5/1/2026</span>
                  <br />
                  <span>Updated: 6/1/2026</span>
                  <span style={{ marginLeft: "30rem" }}>
                    Assigned to staff
                  </span>
                </div>
                
              </div>
            </div>
            <div className="card px-3 mt-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  AC Not Cooling
                  <span class="badge rounded-pill text-bg-success" style={{marginLeft: "1rem"}}>resolved</span>
                  <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1rem"}}>medium</span>
                  <span class="badge rounded-pill text-bg-light" style={{marginLeft: "1rem"}}>electrical</span>
                </h5>
                <div className="text-muted">
                  <p>Air conditioner in bedroom is running but not cooling properly</p>
                  <span>Unit: A-101 </span>
                  <span style={{ marginLeft: "33rem" }}>Created: 3/1/2026</span>
                  <br />
                  <span>Updated: 4/1/2026</span>
                  <span style={{ marginLeft: "30rem" }}>
                    Assigned to staff
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
