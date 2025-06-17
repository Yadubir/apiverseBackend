import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';
import integrationRoutes from './routes/integration.js';
import healthRoutes from './routes/health.js';
import reviewRoutes from './routes/review.js';
import categoriesRoutes from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'https://apiverse-2.onrender.com', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to APIVerse backend' });
});

// Register routes
app.use('/api', searchRoutes);
app.use('/api', integrationRoutes);
app.use('/api', healthRoutes);
app.use('/api', reviewRoutes);
app.use('/api', categoriesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});