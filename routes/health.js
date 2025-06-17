import express from 'express';
import { collection } from '../db.js';
import { ObjectId } from 'mongodb';
import axios from 'axios';

const router = express.Router();

router.get('/health-check/:api_id', async (req, res) => {
  try {
    const doc = await collection.findOne({ _id: new ObjectId(req.params.api_id) });
    if (!doc?.api_url) return res.json({ status: 'Down', latency_ms: -1 });

    const start = Date.now();
    const response = await axios.get(doc.api_url);
    const latency = Date.now() - start;

    res.json({ status: response.status < 400 ? 'Healthy' : 'Unhealthy', latency_ms: latency });
  } catch {
    res.json({ status: 'Down', latency_ms: -1 });
  }
});

export default router;