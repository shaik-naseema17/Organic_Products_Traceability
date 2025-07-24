import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";
import { useNavigate } from "react-router-dom";

function FarmerLogin({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/farmers/login", formData);
      alert("Login successful!");
      onLogin(res.data.farmerId); // This needs to exist in App.js
      navigate("/add-vegetables");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Farmer Login</h2>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default FarmerLogin;
