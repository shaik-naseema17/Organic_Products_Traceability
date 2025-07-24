import mongoose from 'mongoose';

const retailerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  address: String,
});

const Retailer = mongoose.model('Retailer', retailerSchema);

export default Retailer;
