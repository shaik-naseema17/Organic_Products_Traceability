import React, { useState } from "react";
import axios from "axios";
import "./CustomerDashboard.css";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [vegetables, setVegetables] = useState([]);
  const [scannedVegetable, setScannedVegetable] = useState(null);
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate reading QR content
    const qrText = await file.text(); // In real use, decode the image using a library
    const vegId = qrText.trim(); // assume QR contains just vegId

    try {
      const res = await axios.get(`http://localhost:5000/api/vegetables/${vegId}`);
      setScannedVegetable(res.data);
    } catch (err) {
      alert("Failed to fetch vegetable from QR");
    }
  };

  const fetchAllVegetables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vegetables");
      setVegetables(res.data.filter(v => !v.isSold));
    } catch (err) {
      alert("Failed to load vegetables");
    }
  };

  const handleBuyClick = async (vegId) => {
    const qty = quantities[vegId];
    if (!qty || isNaN(qty) || qty <= 0) return alert("Enter valid quantity");

    try {
      // Placeholder for future POST /purchase API
      alert(`Vegetable purchased successfully! Quantity: ${qty}kg`);
      setQuantities((prev) => ({ ...prev, [vegId]: "" }));
    } catch (err) {
      alert("Purchase failed");
    }
  };

  return (
    <div className="customer-dashboard">
      <h2>Customer Dashboard</h2>

      {!selectedOption && (
        <div className="dashboard-options">
          <button onClick={() => navigate("/customer/scan")}>
  Authenticate Scan
</button>

            <button onClick={() => navigate("/ingredients")}>
  Buy Vegetables
</button>
        </div>
      )}

      {selectedOption === "scan" && (
        <div className="scan-section">
          <h3>Upload QR Code</h3>
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
      )}

      {selectedOption === "buy" && (
        <div className="buy-section">
          <h3>Available Vegetables</h3>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price/Kg</th>
                <th>Quantity</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {vegetables.map((veg) => (
                <tr key={veg._id}>
                  <td>
                    {veg.imageUrl ? (
                      <img
                        src={`http://localhost:5000/uploads/${veg.imageUrl}`}
                        alt={veg.productName}
                        width="60"
                      />
                    ) : "No Image"}
                  </td>
                  <td>{veg.productId}</td>
                  <td>{veg.productName}</td>
                  <td>₹{veg.pricePerKg}</td>
                  <td>{veg.quantity}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Qty (kg)"
                      value={quantities[veg._id] || ""}
                      onChange={(e) =>
                        setQuantities({ ...quantities, [veg._id]: e.target.value })
                      }
                    />
                    <button onClick={() => handleBuyClick(veg._id)}>Buy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
