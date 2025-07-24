import express from 'express';
import Retailer from '../models/retailer.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const retailer = new Retailer({ ...req.body, password: hashedPassword });
    await retailer.save();
    res.status(201).json({ message: 'Retailer registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const retailer = await Retailer.findOne({ username });

  if (!retailer || !(await bcrypt.compare(password, retailer.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.status(200).json({ message: 'Retailer logged in successfully' });
});

export default router;
