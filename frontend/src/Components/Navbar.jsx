import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="navbar-heading">Organic Farm</h1>
      <div className="navbar-links">
      <button className="navbar-btn" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="navbar-btn" onClick={() => navigate("/farmer-signup")}>
          Farmer Signup
        </button>
        <button className="navbar-btn" onClick={() => navigate("/farmer-login")}>
          Farmer Login
        </button>
        <button className="navbar-btn" onClick={() => navigate("/distributor-signup")}>
          Distributor Signup
        </button>
        <button className="navbar-btn" onClick={() => navigate("/distributor-login")}>
          Distributor Login
        </button>
        <button className="navbar-btn" onClick={() => navigate("/retailer-signup")}>
          Retailer Signup
        </button>
        <button className="navbar-btn" onClick={() => navigate("/retailer-login")}>
          Retailer Login
        </button>
        <button className="navbar-btn" onClick={() => navigate("/customer-signup")}>
          CostumerSignup
        </button>
        <button className="navbar-btn" onClick={() => navigate("/customer-login")}>
          Costumer Login
        </button>
         <button className="navbar-btn" onClick={() => navigate("/blockchain")}>
          View Blockchain
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
