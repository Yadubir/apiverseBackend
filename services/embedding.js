import { collection } from '../db.js';
import { pipeline } from '@xenova/transformers';
import dotenv from 'dotenv';
import * as math from 'mathjs';

dotenv.config();

const embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L12-v2');

export const getQueryEmbedding = async (query) => {
  const result = await embed(query, { pooling: 'mean', normalize: true });
  return result.data;
};

function cosineSimilarity(a, b) {
  const aArray = Array.from(a); // ✅ convert typed array to normal array
  const bArray = Array.from(b);

  if (!Array.isArray(aArray) || !Array.isArray(bArray)) {
    console.error("❌ cosineSimilarity inputs must be arrays:", { a, b });
    return 0;
  }

  try {
    const dotProduct = math.dot(aArray, bArray);
    const normA = math.norm(aArray);
    const normB = math.norm(bArray);
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  } catch (err) {
    console.error("❌ Error computing cosine similarity:", err);
    return 0;
  }
}

const serializeDoc = (doc) => {
  doc._id = doc._id.toString();
  delete doc.embedding;
  return doc;
};

export const searchAPIs = async (query, top_k = 5) => {
  const queryVector = await getQueryEmbedding(query);
  const docs = await collection.find({ embedding: { $exists: true } }).toArray();

  const scored = docs.map(doc => {
    const score = cosineSimilarity(queryVector, doc.embedding || []);
    return { score, doc };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, top_k).map(({ doc }) => serializeDoc(doc));
};