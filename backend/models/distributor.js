import mongoose from 'mongoose';

const distributorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  address: String,
});

const Distributor = mongoose.model('Distributor', distributorSchema);

export default Distributor;
