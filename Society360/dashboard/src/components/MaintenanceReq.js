import React from "react";

function MaintenanceReq({ setIsVisible }) {
  return (
    <div className="container border p-2 my-4" style={{ borderRadius: "1rem" }}>
      <div className="row p-4">
        <h3 className="mb-4">Submit Maintenance Request</h3>
        <form className="row">
          <div className="mb-3 col-6">
            <label for="exampleInputVisitor1" className="form-label">
              Issue Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputVisitor1"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="phone" class="form-label">
              Unit Number
            </label>
            <input type="text" class="form-control" id="phone" />
          </div>
          <div class="mb-3 col-6">
            <label for="purpose" class="form-label">
              Category
            </label>
            <select class="form-select" aria-label="Default select example">
              <option value="1" selected>
                Plumbing
              </option>
              <option value="2">Electrical</option>
              <option value="3">Cleaning</option>
              <option value="4">Other</option>
            </select>
          </div>
          <div class="mb-3 col-6">
            <label for="unit-no" class="form-label">
              Priorty
            </label>
            <select class="form-select" aria-label="Default select example">
              <option value="1">Low</option>
              <option value="2" selected>
                Medium
              </option>
              <option value="3">High</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary col-auto mx-3">
            Submit Request
          </button>
          <button
            type="button"
            class="btn btn-outline-primary col-auto"
            disabled
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default MaintenanceReq;
