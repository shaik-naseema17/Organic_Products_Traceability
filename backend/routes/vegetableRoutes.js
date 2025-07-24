import express from 'express';
import multer from 'multer';
import path from 'path';
import Vegetable from '../models/Vegetable.js';
import { logTransaction } from "../helpers/blockLogger.js"; // adjust path as needed

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Add vegetable route
// Add vegetable route with hash
router.post('/add', upload.single('image'), async (req, res) => {
  const { productId, productName, quantity, pricePerKg, latitude, longitude } = req.body;
  const imageUrl = req.file ? req.file.filename : "";

  try {
    const latestVeg = await Vegetable.findOne().sort({ timestamp: -1 });

    const newVegetable = new Vegetable({
      productId,
      productName,
      quantity,
      pricePerKg,
      imageUrl,
      previousHash: latestVeg ? latestVeg.currentHash : "0"
    });

    newVegetable.currentHash = newVegetable.computeHash();
    await newVegetable.save();

    // ✅ Log blockchain transaction with location + image
    await logTransaction({
  vegetableId: productId,
  fromRole: "Farmer",
  fromId: "farmer123",
  toRole: "Distributor",
  toId: "",
  action: "Added Vegetable",
  details: `Name: ${productName}, Quantity: ${quantity}, Price: ${pricePerKg}`,
  imageUrl: `${req.protocol}://${req.get('host')}/uploads/${imageUrl}`,
  latitude: parseFloat(latitude),     // 👈 parse because it's string from FormData
  longitude: parseFloat(longitude)
});


    res.status(201).json({ message: 'Vegetable added with blockchain hash' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// GET /api/vegetables
router.get("/", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vegetables" });
  }
});
// POST /api/vegetables/:id/ingredients
router.post("/:id/ingredients", async (req, res) => {
  const { id } = req.params;
  const { ingredient } = req.body;

  try {
    const vegetable = await Vegetable.findById(id);
    if (!vegetable) return res.status(404).json({ error: "Vegetable not found" });

    vegetable.ingredients.push(ingredient);
    vegetable.timestamp = new Date();
    vegetable.currentHash = vegetable.computeHash();

    await vegetable.save();

    // ✅ Log blockchain transaction
    await logTransaction({
      vegetableId: vegetable.productId,
      fromRole: "Distributor",
      fromId: "distributor123",  // replace with actual distributor ID if available
      toRole: "Retailer",
      toId: "",
      action: `Added Ingredient`,
      details: `Ingredient: ${ingredient}`
    });

    res.status(200).json({ message: "Ingredient added with blockchain update" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add ingredient" });
  }
});


// PATCH /api/vegetables/:id/sell
router.patch("/:id/sell", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    if (!vegetable) return res.status(404).json({ error: "Vegetable not found" });

    vegetable.isSold = true;
    await vegetable.save();

    // ✅ Log Retailer → Customer transaction
    await logTransaction({
      vegetableId: vegetable.productId,
      fromRole: "Retailer",
      fromId: "retailer123", // Replace with actual retailer ID
      toRole: "Customer",
      toId: "customerXYZ",    // Replace or fetch actual customer ID if available
      action: "Sold by Retailer",
      details: `Retailer sold product ${vegetable.productName}`
    });

    res.status(200).json({ message: "Vegetable marked as sold and transaction logged" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as sold" });
  }
});


// b) Fetch single vegetable by ID
router.get("/:id", async (req, res) => {
  try {
    const veg = await Vegetable.findById(req.params.id);
    if (!veg) return res.status(404).json({ error: "Vegetable not found" });
    res.json(veg);
  } catch {
    res.status(500).json({ error: "Failed to fetch vegetable" });
  }
});
router.post("/:id/purchase", async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const veg = await Vegetable.findById(req.params.id);
    if (!veg) return res.status(404).json({ error: "Vegetable not found" });

    if (veg.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    veg.quantity -= quantity;
    await veg.save();

    // ✅ Log customer purchase
    await logTransaction({
      vegetableId: veg.productId,
      fromRole: "Customer",
      fromId: "customerXYZ",  // Replace with actual customer ID if logged in
      toRole: "Purchase Complete",
      toId: "-",
      action: "Purchased",
      details: `Customer bought ${quantity}kg of ${veg.productName}`
    });

    res.json({ message: `Purchased ${quantity}kg`, remaining: veg.quantity });
  } catch {
    res.status(500).json({ error: "Failed to purchase" });
  }
});


export default router;
