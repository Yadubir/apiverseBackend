import express from 'express';
import { searchAPIs } from '../services/embedding.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  const { query } = req.body;
  console.log('Received query:', query);
  const results = await searchAPIs(query);
  res.json(results);
});

export default router;