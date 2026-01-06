import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="images\favicons\favicon-96x96.png"
            alt="Logo"
            style={{width: "10%"}}
          />
          <img
            src="images\logos\Long_logo.png"
            alt="Logo"
            style={{width: "23%"}}
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="" style={{marginLeft: "23rem"}}>
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="">
                Contact
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
