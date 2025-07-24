import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  address: String,
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
