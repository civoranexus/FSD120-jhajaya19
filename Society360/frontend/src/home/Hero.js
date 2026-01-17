import React from "react";
import "../index";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="container-fluid mb-5"
      style={{ backgroundColor: "#1B9AAA" }}
    >
      <div className="row text-center text-white">
        <h1 style={{ fontSize: "70px", marginTop: "50px" }} className="mb-4">
          Society360
        </h1>
        <p style={{ fontSize: "1.5rem" }}>
          The Smart Residential Management System designed to create a secure,
          integrated platform
          <br /> for modern living.
        </p>
        <Link to="/about">
          <button
            className="p-2 btn btn-light fs-5 mt-3 mb-5"
            style={{ width: "10%", margin: "0 auto" }}
          >
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
