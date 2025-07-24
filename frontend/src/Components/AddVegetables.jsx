import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

function AddVegetables() {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    quantity: "",
    pricePerKg: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Get user's current location
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    const data = new FormData();
    data.append("productId", formData.productId);
    data.append("productName", formData.productName);
    data.append("quantity", formData.quantity);
    data.append("pricePerKg", formData.pricePerKg);
    data.append("image", formData.image);
    data.append("latitude", latitude);     // ✅ add lat/lng
    data.append("longitude", longitude);   // ✅ add lat/lng

    try {
      const res = await axios.post("http://localhost:5000/api/vegetables/add", data);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding vegetable");
    }
  }, (err) => {
    alert("Location access denied. Cannot submit form.");
  });
};


  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Vegetables</h2>
        <input type="text" name="productId" placeholder="Product ID" required onChange={handleChange} />
        <input type="text" name="productName" placeholder="Product Name" required onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity (kg)" required onChange={handleChange} />
        <input type="number" name="pricePerKg" placeholder="Price per kg" required onChange={handleChange} />
        <input type="file" name="image" accept="image/*" required onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddVegetables;
