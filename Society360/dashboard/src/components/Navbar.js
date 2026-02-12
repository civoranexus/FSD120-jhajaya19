import React from "react";
import {Link, useNavigate} from "react-router-dom"

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to external URL
    window.location.href = 'http://localhost:3001';
  };

  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <h3 style={{fontWeight: "bold", color: "darkblue"}}>Society360</h3>
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
              <Link
                class="nav-link active"
                aria-current="page"
                to="/"
                style={{ marginLeft: "9rem" }}
              >
                <i class="fa fa-th-large" aria-hidden="true"></i> Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/visitors">
                <i class="fa fa-user" aria-hidden="true"></i> Visitors
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/maintenance">
                <i class="fa fa-wrench" aria-hidden="true"></i> Maintenance
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/billing">
                <i class="fa fa-credit-card" aria-hidden="true"></i> Billing
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/announcements">
                <i class="fa fa-bell-o" aria-hidden="true"></i> Announcements
              </Link>
            </li>
          </ul>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-dark"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
