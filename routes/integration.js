import express from 'express';
import { generateCodeSnippet } from '../services/geminiIntegration.js';

const router = express.Router();

router.post('/suggest-integration', async (req, res) => {
  try {
    const code = await generateCodeSnippet(req.body);
    res.json({ code_snippet: code });
  } catch (err) {
    res.status(500).json({ error: 'Error generating code snippet' });
  }
});

export default router;