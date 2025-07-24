import mongoose from "mongoose";
import crypto from "crypto";

const VegetableSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  quantity: Number,
  pricePerKg: Number,
  imageUrl: String,
  ingredients: [String],
  isSold: { type: Boolean, default: false },
  previousHash: String,
  currentHash: String,
  timestamp: { type: Date, default: Date.now }
});

// 🧠 Function to compute hash based on key data
VegetableSchema.methods.computeHash = function () {
  const dataString = this.productId + this.productName + this.quantity + this.pricePerKg + this.ingredients.join(",") + this.timestamp;
  return crypto.createHash("sha256").update(dataString).digest("hex");
};

const Vegetable = mongoose.model("Vegetable", VegetableSchema);
export default Vegetable;
