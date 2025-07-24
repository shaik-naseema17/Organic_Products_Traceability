import express from 'express';
import Distributor from '../models/distributor.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const distributor = new Distributor(req.body);
    await distributor.save();
    res.status(201).json({ message: 'Distributor registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const distributor = await Distributor.findOne({ username });

  if (!distributor || distributor.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.status(200).json({ message: 'Distributor logged in successfully' });
});

export default router;
