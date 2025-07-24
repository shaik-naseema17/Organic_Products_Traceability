import mongoose from 'mongoose';
import crypto from 'crypto';

const blockSchema = new mongoose.Schema({
  vegetableId: { type: String, required: true },
  fromRole: String,
  fromId: String,
  toRole: String,
  toId: String,
  action: String,
  details: String,
  previousHash: String,
  currentHash: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
  imageUrl: String // ← Add this
});



blockSchema.methods.computeHash = function () {
  return crypto
    .createHash("sha256")
    .update(
      this.vegetableId +
      this.fromRole +
      this.toRole +
      this.action +
      this.details +
      this.previousHash +
      this.timestamp
    )
    .digest("hex");
};

const ChainBlock = mongoose.model("ChainBlock", blockSchema);
export default ChainBlock;
