import crypto from 'crypto';
import ChainBlock from "../models/ChainBlock.js";

// Function to compute hash
function computeHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export const logTransaction = async ({
  vegetableId,
  fromRole,
  fromId,
  toRole,
  toId,
  action,
  details,
  latitude,         // 👈 include this
  longitude,        // 👈 and this
  imageUrl
}) => {
  const latest = await ChainBlock.findOne({ vegetableId }).sort({ timestamp: -1 });

  const newBlock = new ChainBlock({
    vegetableId,
    fromRole,
    fromId,
    toRole,
    toId,
    action,
    details,
    previousHash: latest ? latest.currentHash : '0',
    latitude,         // 👈 save here
    longitude,        // 👈 and here
    imageUrl
  });

  newBlock.currentHash = newBlock.computeHash();
  await newBlock.save();
};



