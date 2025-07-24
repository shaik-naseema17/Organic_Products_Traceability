import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";
import { useNavigate } from "react-router-dom";

function FarmerSignupForm() {
  const [formData, setFormData] = useState({
  username: "",
  password: "",
  phone: "",
  email: "",
  address: "",
  farmLocation: "",
  farmSize: "",
  irrigationMethods: ""
});

  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/farmers/register", formData);
      alert("Farmer registered successfully!");
      navigate('/farmer-login');
    } catch (err) {
      alert("Error registering farmer.");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Farmer Signup</h2>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="farmLocation" type="text" placeholder="Farm Location" onChange={handleChange} required />
<input name="farmSize" type="text" placeholder="Farm Size (e.g., 5 acres)" onChange={handleChange} required />
<input name="irrigationMethods" type="text" placeholder="Irrigation Methods" onChange={handleChange} required />

        <textarea name="address" placeholder="Address" onChange={handleChange} required />
        <button type="submit">Add Farmer</button>
      </form>
    </div>
  );
}

export default FarmerSignupForm;
