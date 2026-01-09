import React from "react";

function Dashboard() {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <h1 style={{ fontWeight: "bold" }}>Welcome back!</h1>
          <p className="mt-2 fs-5">
            Here's what's happening in your community today
          </p>

          <div className="col mb-4 mt-5">
            <div
              className="card px-3"
              style={{ width: "18rem", marginLeft: "" }}
            >
              <div className="card-body">
                <p className="card-title mb-3">
                  Pending Requests{" "}
                  <i
                    class="fa fa-lg fa-clock-o"
                    aria-hidden="true"
                    style={{ marginLeft: "4rem", fontSize: "2rem" }}
                  ></i>
                </p>
                <h3>3</h3>
              </div>
            </div>
          </div>
          <div className="col mb-4 mt-5">
            <div className="card px-3" style={{ width: "18rem" }}>
              <div className="card-body">
                <p className="card-title mb-3">
                  Pending Bills{" "}
                  <i
                    class="fa fa-lg fa-credit-card"
                    aria-hidden="true"
                    style={{ marginLeft: "4rem" }}
                  ></i>
                </p>
                <h3>1</h3>
              </div>
            </div>
          </div>
          <div className="col mb-4 mt-5">
            <div className="card px-3" style={{ width: "18rem" }}>
              <div className="card-body">
                <p className="card-title mb-3">
                  Active Visitors{" "}
                  <i
                    class="fa fa-lg fa-user"
                    aria-hidden="true"
                    style={{ marginLeft: "4rem" }}
                  ></i>
                </p>
                <h3>2</h3>
              </div>
            </div>
          </div>
          <div className="col mb-4 mt-5">
            <div className="card px-3" style={{ width: "18rem" }}>
              <div className="card-body">
                <p className="card-title mb-3">
                  New Announcements{" "}
                  <i
                    class="fa fa-lg fa-bell"
                    aria-hidden="true"
                    style={{ marginLeft: "2rem" }}
                  ></i>
                </p>
                <h3>5</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="col-8">
          <div className="row">
            <h1 style={{ fontWeight: "bold" }}>Quick Actions</h1>

            <div className="col mb-4 mt-5">
              <div
                className="card px-3"
                style={{ width: "25rem", marginLeft: "" }}
              >
                <div className="card-body">
                    <i class="fa fa-lg fa-wrench mb-4 mt-2" aria-hidden="true" style={{fontSize: "2.2rem"}}></i>
                  <h5 className="card-title mb-3">
                    Submit Maintenance Request
                  </h5>
                  <p>Report an issue in your unit</p>
                </div>
              </div>
            </div>
            <div className="col mb-4 mt-5">
              <div className="card px-3" style={{ width: "25rem" }}>
                <div className="card-body">
                    <i class="fa fa-lg fa-user mb-4 mt-2" aria-hidden="true" style={{fontSize: "2.2rem"}}></i>
                  <h5 className="card-title mb-3">
                    Pre-approve Visitor
                  </h5>
                  <p>Add expected guests</p>
                </div>
              </div>
            </div>
            <div className="col mb-4 mt-5">
              <div className="card px-3" style={{ width: "25rem" }}>
                <div className="card-body">
                    <i class="fa fa-lg fa-credit-card mb-4 mt-2" aria-hidden="true" style={{fontSize: "2.2rem"}}></i>
                  <h5 className="card-title mb-3">
                    View Bills
                  </h5>
                  <p>Check pending payments</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col-4">
            <div className="row">
                <h3>Recent Activity</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
