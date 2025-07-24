import ChainBlock from "../models/ChainBlock.js";

export const logTransaction = async ({ vegetableId, fromRole, fromId, toRole, toId, action, details }) => {
  const latest = await ChainBlock.findOne({ vegetableId }).sort({ timestamp: -1 });

  const newBlock = new ChainBlock({
    vegetableId,
    fromRole,
    fromId,
    toRole,
    toId,
    action,
    details,
    previousHash: latest ? latest.currentHash : '0'
  });

  newBlock.currentHash = newBlock.computeHash();
  await newBlock.save();
};
