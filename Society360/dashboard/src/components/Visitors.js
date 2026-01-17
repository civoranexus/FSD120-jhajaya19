import React, {useState} from "react";
import PreApproveVisitor from "./PreApproveVisitor";
import {dummyVisitors} from  "../data/data"

function Visitors() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontWeight: "bold" }}>Visitor Management
        <button class="btn btn-primary" href="" role="button" style={{marginLeft: "43rem"}} onClick={toggleVisibility}><i class="fa fa-user-o text-white m-2" aria-hidden="true"></i>
         {isVisible ? "Hide form" : "Pre Approve Visitor"}</button>
        </h1>
        <p className="mt-4 mb-5 fs-5 text-muted">
          Pre-approve and track visitor entry/exit
        </p>
        {/* <input class="form-control" type="text" value="Search by name, phone and unit number..." aria-label="readonly input example" readonly><i class="fa fa-search" aria-hidden="true"></i></input> */}
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search by name, phone and unit number..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        {isVisible && <PreApproveVisitor setIsVisible={setIsVisible} />}

        <div className="row">
          <div className="row mb-4 mt-4">
            <div className="card px-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Rajesh Kumar{" "}
                  <span class="badge rounded-pill text-bg-success" style={{marginLeft: "1rem"}}>approved</span>
                </h5>
                <div className="text-muted">
                  <span>Phone: +91 98765XXXXX</span>
                  <span style={{ marginLeft: "30rem" }}>Unit: A-101</span>
                  <br />
                  <span>Purpose: Delivery</span>
                  <span style={{ marginLeft: "33rem" }}>
                    Entry: 6/1/2026, 10:30:00 am
                  </span>
                </div>
                
              </div>
            </div>
            <div className="card px-3 mt-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Priya Sharma
                  <span class="badge rounded-pill text-bg-warning" style={{marginLeft: "1rem"}}>pending</span>
                </h5>
                <div className="text-muted">
                  <span>Phone: +91 88765XXXXX</span>
                  <span style={{ marginLeft: "30rem" }}>Unit: A-101</span>
                  <br />
                  <span>Purpose: Guest</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visitors;
