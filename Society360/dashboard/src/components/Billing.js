import React from "react";

function Billing() {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Finance & Billing</h1>
        <p className="mt-4 mb-3 fs-5 text-muted">
          View bills and manage payments
        </p>

        <div className="row mt-3">
          <div className="col">
            <div
              className="card px-3"
              style={{ width: "23rem", marginLeft: "" }}
            >
              <div className="card-body">
                <p className="card-title mb-3">
                  <i class="fa fa-lg fa-credit-card" aria-hidden="true" style={{marginRight: "8px", fontSize: "2rem", color: "red"}}></i>{" "}
                  Pending Amount
                </p>
                <h3>₹5,000</h3>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card px-3"
              style={{ width: "23rem", marginLeft: "" }}
            >
              <div className="card-body">
                <p className="card-title mb-3">
                  <i class="fa fa-lg fa-check-circle-o" aria-hidden="true" style={{marginRight: "8px", fontSize: "2rem", color: "green"}}></i>{" "}
                  Total Paid
                </p>
                <h3>₹10,000</h3>
              </div>
            </div>
          </div>

          <div className="col mb-4">
            <div
              className="card px-3"
              style={{ width: "23rem", marginLeft: "" }}
            >
              <div className="card-body">
                <p className="card-title mb-3">
                  <i class="fa fa-lg fa-credit-card" aria-hidden="true" style={{marginRight: "8px", fontSize: "2rem", color: "blue"}}></i>{" "}
                  Total Bills
                </p>
                <h3>3</h3>
              </div>
            </div>
          </div>
        </div>
        <br/>

        <div class="input-group  mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search bills..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Monthly Maintenance - January 2026
                  <span
                    class="badge rounded-pill text-bg-warning"
                    style={{ marginLeft: "1rem" }}
                  >
                    pending
                  </span>
                  <a
                    class="btn btn-primary"
                    href=""
                    role="button"
                    style={{ marginLeft: "40rem" }}
                  >
                    <i class="fa fa-credit-card m-2" aria-hidden="true"></i>Pay
                    Now
                  </a>
                </h5>
                <div className="text-muted">
                  <span>Amount: ₹5,000</span>
                  <span style={{ marginLeft: "17rem" }}>
                    Due Date: 15/1/2026
                  </span>
                  <span style={{ marginLeft: "17rem" }}>Unit: A-101</span>
                </div>
              </div>
            </div>
            <div className="card px-3 mt-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Monthly Maintenance - December 2025
                  <span
                    class="badge rounded-pill text-bg-success"
                    style={{ marginLeft: "1rem" }}
                  >
                    paid
                  </span>
                  <a
                    class="btn btn-outline-info"
                    href=""
                    role="button"
                    style={{ marginLeft: "40rem" }}
                  >
                    <i class="fa fa-download m-2" aria-hidden="true"></i>{" "}
                    Reciept
                  </a>
                </h5>
                <div className="text-muted">
                  <span>Amount: ₹5,000</span>
                  <span style={{ marginLeft: "17rem" }}>
                    Due Date: 15/12/2025
                  </span>
                  <span style={{ marginLeft: "17rem" }}>Unit: A-101</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <h3>Payment History</h3>
          <div className="row">
            <div className="card px-3 mt-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i class="fa fa-check fa-lg text-blue" aria-hidden="true"></i>{" "}
                  Payment Successful
                  <a
                    class="btn btn-outline-info"
                    href=""
                    role="button"
                    style={{ marginLeft: "55rem" }}
                  >
                    <i class="fa fa-download m-2" aria-hidden="true"></i>{" "}
                    Reciept
                  </a>
                </h5>
                <div className="text-muted">
                  <span>Amount: ₹5,000</span>
                  <span style={{ marginLeft: "17rem" }}>
                    Due Date: 10/12/2025
                  </span>
                  <span style={{ marginLeft: "15rem" }}>
                    Transaction ID: TXN123456789
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

export default Billing;
