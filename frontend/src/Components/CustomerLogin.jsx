import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/customer/login", credentials);
      alert(res.data.message);
      navigate("/dashboard")

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Customer Login</h2>
        <input name="username" type="text" placeholder="Username" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
