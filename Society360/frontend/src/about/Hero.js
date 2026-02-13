import React from "react";

function Hero() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-4">
          <h1 className="mt-5"
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "darkblue",
            }}
          >
            Orchestrating Community Harmony
          </h1>
          <p className="fs-5 mt-4 text-muted">
            A comprehensive digital system connecting residents, management, and
            staff for efficient operations.
          </p>
        </div>
        <div className="col"></div>
        <div className="col-7" >
          <div className="row" style={{ borderLeft: "4px solid darkblue" , paddingLeft: "15px"}}>
            <h2 className="mt-5">The Vision</h2>
            <p className="fs-5 mt-3 text-muted">
              Society360 is a full-stack software development project designed
              to create a secure, integrated platform for managing all
              administrative, communication, and facility needs of a modern
              residential society. Developed under the CivoraX Internship
              Program by Civora Nexus Pvt. Ltd.
            </p>
          </div>
          <div className="row" style={{ borderLeft: "4px solid darkblue" , paddingLeft: "15px"}}>
            <h2 className="mt-5">Core Objectives</h2>
            <p className="fs-5 mt-3 mb-5 text-muted ">
              To build a comprehensive digital system that connects residents,
              the management committee, and facility staff for efficient and
              transparent operations. The system emphasizes practical skills in
              facility management architecture, secure digital payments, and
              real-time notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
