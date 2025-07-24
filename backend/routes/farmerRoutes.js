import express from 'express';
import Farmer from '../models/Farmer.js';
import Vegetable from '../models/Vegetable.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router = express.Router();

// Register farmer
router.post('/register', async (req, res) => {
  const { username, password, phone, email, address, farmLocation, farmSize, irrigationMethods } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 1: Get previous hash from last registered farmer
    const lastFarmer = await Farmer.findOne().sort({ timestamp: -1 });
    const previousHash = lastFarmer ? lastFarmer.currentHash : null;

    // Step 2: Create raw data for new farmer block (excluding currentHash)
    const blockData = {
      username,
      phone,
      email,
      address,
      farmLocation,
      farmSize,
      irrigationMethods,
      previousHash,
      timestamp: new Date().toISOString()
    };

    // Step 3: Generate current hash
    const currentHash = crypto.createHash('sha256').update(JSON.stringify(blockData)).digest('hex');

    // Step 4: Create new farmer object with hash
    const newFarmer = new Farmer({
      username,
      password: hashedPassword,
      phone,
      email,
      address,
      farmLocation,
      farmSize,
      irrigationMethods,
      previousHash,
      currentHash
    });

    await newFarmer.save();
    res.status(201).json({ message: 'Farmer registered successfully' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Login farmer
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ username });
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET);
    res.json({ token, farmerId: farmer._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
