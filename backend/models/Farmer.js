import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  address: String,
  farmLocation: String,
  farmSize: String,
  irrigationMethods: String,
  previousHash: String,
  currentHash: String,
  timestamp: { type: Date, default: Date.now }
});

// ✅ Default export of the model
const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;

