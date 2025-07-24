import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowVegetables.css";

function ShowVegetables() {
  const [vegetables, setVegetables] = useState([]);
  const [ingredients, setIngredients] = useState({});

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

  const handleAddIngredient = async (vegId) => {
    const ing = ingredients[vegId];
    if (!ing) {
      alert("Please enter an ingredient");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/vegetables/${vegId}/ingredients`, {
        ingredient: ing,
      });
      alert("Ingredient added successfully");
      setIngredients({ ...ingredients, [vegId]: "" });
    } catch (err) {
      alert("Failed to add ingredient");
    }
  };

  return (
    <div className="showveg">
      <div className="vegetables-container">
        <h2>Available Vegetables</h2>
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price/Kg</th>
                <th>Add Ingredient</th>
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
                  <td>{veg.quantity}</td>
                  <td>₹{veg.pricePerKg}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter ingredient"
                      value={ingredients[veg._id] || ""}
                      onChange={(e) =>
                        setIngredients({ ...ingredients, [veg._id]: e.target.value })
                      }
                    />
                    <button onClick={() => handleAddIngredient(veg._id)}>Add</button>
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

export default ShowVegetables;
