import React from "react";

function Experience() {
  return (
    <div
      className="container mb-5"
    >
      <div className="row text-center">
        <h1 style={{ fontSize: "80px", marginTop: "50px" , color: "blue" , fontWeight: "bold" }} className="mb-4">
          Experience<br/> Seamless Living
        </h1>
        <p style={{ fontSize: "1.5rem" }} className="text-muted">
          Join the future of residential management. Secure, efficient, and<br/> community-focused.
        </p>
        <button
          className="p-2 btn btn-dark fs-5 mt-3 mb-5"
          style={{ width: "15%", margin: "0 auto" }}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}

export default Experience;
