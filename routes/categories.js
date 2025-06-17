import express from 'express';
import { collection } from '../db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/filter_by_categories', async (req, res) => {
  const { categories } = req.body;
  if (!categories) return res.status(400).json({ error: 'Category must be provided.' });

  try {
    const query = { category: { $regex: `\\b${categories}\\b`, $options: 'i' } };
    const docs = await collection.find(query).toArray();

    const apis = docs.map(doc => ({
      _id: doc._id.toString(),
      name: doc.name || null,
      description: doc.description || null,
      category: doc.category || null,
      auth: doc.authentication_type || null,
      cors: doc.cors_support || null,
      rating: doc.rating || null,
      health_score: doc.health_score || null,
      api_url: doc.api_url || null,
      website: doc.link || null,
    }));

    res.json(apis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error filtering categories' });
  }
});

export default router;