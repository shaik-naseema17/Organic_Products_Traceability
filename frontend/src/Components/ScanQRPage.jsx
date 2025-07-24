import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function ScanQRPage() {
  const [scannedVegetable, setScannedVegetable] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const qrText = await file.text(); // Simulate QR decoding
      const vegId = qrText.trim();

      const res = await axios.get(`http://localhost:5000/api/vegetables/${vegId}`);
      setScannedVegetable(res.data);
    } catch (err) {
      alert("Failed to fetch vegetable. QR might be invalid.");
    }
  };

  return (
    <div className="customer-dashboard">
      <h2>Authenticate Vegetable QR</h2>
      <div className="scan-section">
        <input type="file" accept="text/plain" onChange={handleFileUpload} />
        {scannedVegetable && (
          <div className="veg-details">
            <p><strong>Name:</strong> {scannedVegetable.productName}</p>
            <p><strong>ID:</strong> {scannedVegetable.productId}</p>
            <p><strong>Price:</strong> ₹{scannedVegetable.pricePerKg}</p>
            <p><strong>Quantity:</strong> {scannedVegetable.quantity}</p>
            <p><strong>Ingredients:</strong> {scannedVegetable.ingredients?.join(", ") || "None"}</p>
            {scannedVegetable.imageUrl && (
              <img
                src={`http://localhost:5000/uploads/${scannedVegetable.imageUrl}`}
                alt={scannedVegetable.productName}
                width="100"
              />
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default ScanQRPage;
