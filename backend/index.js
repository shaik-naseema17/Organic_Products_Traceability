import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import vegetableRoutes from './routes/vegetableRoutes.js';
// Route imports
import customerRoutes from './routes/customerRoutes.js';

import farmerRoutes from './routes/farmerRoutes.js';
import distributorRoutes from './routes/distributorRoutes.js';
import retailerRoutes from './routes/retailerRoutes.js';
import blockchainRoutes from './routes/blockchain.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API route mounts
app.use('/api/farmers', farmerRoutes);
app.use('/api/distributor', distributorRoutes);
app.use('/api/retailer', retailerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/vegetables', vegetableRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
