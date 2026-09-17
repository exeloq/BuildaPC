import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.PCPARTS_MONGODB_URI || process.env.MONGODB_URI;
let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await getMongoClient();
    const db = client.db('PCParts');
    const partsCollection = db.collection('parts');

    const { parts } = req.body;
    const result = await partsCollection.insertMany(parts);

    return res.status(201).json({
      success: true,
      insertedCount: result.insertedCount
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
