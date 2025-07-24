import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

function RetailerSignup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/retailer/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Retailer Signup</h2>
        <input name="username" type="text" placeholder="Username" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <textarea name="address" placeholder="Address" required onChange={handleChange}></textarea>
        <button type="submit">Add Retailer</button>
      </form>
    </div>
  );
}

export default RetailerSignup;
