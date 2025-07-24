import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ShowIngredientsPage.css";

function ShowIngredientsPage() {
  const [vegetables, setVegetables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vegetables");
        setVegetables(res.data);
      } catch (err) {
        alert("Failed to fetch vegetables");
      }
    };
    fetchVegetables();
  }, []);

  const handleSell = async (vegId) => {
    try {
      await axios.patch(`http://localhost:5000/api/vegetables/${vegId}/sell`);
      setVegetables((prev) =>
        prev.map((veg) =>
          veg._id === vegId ? { ...veg, isSold: true } : veg
        )
      );
      
    } catch (err) {
      alert("Failed to mark as sold");
    }
  };

  return (
    <div className="ingredients">
      <div className="ingredients-container">
        <h2>Vegetables and Ingredients</h2>
        <div className="ingredients-table-box">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price/Kg</th>
                <th>Quantity</th>
                <th>Ingredients</th>
                <th>QR</th> {/* Moved QR before Status */}
                <th>Status</th>
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
                        height="60"
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{veg.productId}</td>
                  <td>{veg.productName}</td>
                  <td>₹{veg.pricePerKg}</td>
                  <td>{veg.quantity}</td>
                  <td>
                    {veg.ingredients?.length > 0 ? (
                      <ul>
                        {veg.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    ) : (
                      "No Ingredients"
                    )}
                  </td>
                  <td>
                    <button onClick={() => navigate(`/generateqr/${veg._id}`)}>
                      Generate QR
                    </button>
                  </td>
                  <td>
                    {veg.isSold ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Already Sold
                      </span>
                    ) : (
                      <button onClick={() => handleSell(veg._id)}>
                        Click here to sell
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowIngredientsPage;
