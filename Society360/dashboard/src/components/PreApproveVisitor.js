import React from "react";

function PreApproveVisitor({setIsVisible}) {
  return (
    <div className="container border p-2 my-4" style={{borderRadius: "1rem"}}>
        <div className="row p-4">
        <h3 className="mb-4">Pre-approve New Visitor</h3>
      <form className="row">
        <div className="mb-3 col-6">
          <label for="exampleInputVisitor1" className="form-label">
            Visitor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputVisitor1"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            class="form-control"
            id="phone"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="purpose" class="form-label">
            Purpose of Visit
          </label>
          <input
            type="text"
            class="form-control"
            id="purpose"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="unit-no" class="form-label">
            Unit Number
          </label>
          <input
            type="text"
            class="form-control"
            id="unit-no"
          />
        </div>
        <button type="submit" className="btn btn-primary col-auto mx-3">
          Submit Request
        </button>
        <button type="button" class="btn btn-outline-primary col-auto" disabled>Cancel</button>
      </form>
      </div>
    </div>
  );
}

export default PreApproveVisitor;
