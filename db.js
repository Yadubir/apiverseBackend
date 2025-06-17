import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("apiverse");

export const collection = db.collection("apis");
export const reviews = db.collection("reviews");
export { client };