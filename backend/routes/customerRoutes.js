import express from 'express';
import Customer from '../models/customer.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const customer = await Customer.findOne({ username });

  if (!customer || customer.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.status(200).json({ message: 'Customer logged in successfully' });
});

export default router;
