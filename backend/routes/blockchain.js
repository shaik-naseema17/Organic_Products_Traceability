import express from 'express';
import ChainBlock from '../models/ChainBlock.js';

const router = express.Router();

// GET /api/blockchain/:vegetableId
router.get('/:vegetableId', async (req, res) => {
  const { vegetableId } = req.params;

  try {
    // Fetch all blocks with matching vegetableId
    const blocks = await ChainBlock.find({ vegetableId }).sort({ timestamp: 1 });

    // Optional: Validate chain integrity here
    for (let i = 1; i < blocks.length; i++) {
      const expectedPrev = blocks[i - 1].currentHash;
      if (blocks[i].previousHash !== expectedPrev) {
        return res.status(400).json({ error: "Blockchain integrity compromised" });
      }
    }

    res.json({ chain: blocks });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve chain" });
  }
});

export default router;
