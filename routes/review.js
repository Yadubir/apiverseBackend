import express from 'express';
import { reviews } from '../db.js';

const router = express.Router();

router.post('/review/:api_id', async (req, res) => {
  const data = {
    ...req.body,
    api_id: req.params.api_id,
    timestamp: new Date(),
  };
  await reviews.insertOne(data);
  res.json({ message: 'Review submitted' });
});

router.get('/review/:api_id', async (req, res) => {
  const data = await reviews.find({ api_id: req.params.api_id }).project({ _id: 0 }).toArray();
  res.json(data);
});

export default router;