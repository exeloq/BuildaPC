import { MongoClient, ObjectId } from 'mongodb';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    const client = await getMongoClient();
    const db = client.db('PCParts');
    const partsCollection = db.collection('parts');

    // GET /api/parts/:id - Get single part
    if (req.method === 'GET') {
      let part = null;
      if (ObjectId.isValid(id)) {
        part = await partsCollection.findOne({ _id: new ObjectId(id) });
      }
      if (!part) {
        part = await partsCollection.findOne({ id: parseInt(id) });
      }

      if (!part) {
        return res.status(404).json({ error: 'Part not found' });
      }

      return res.status(200).json(part);
    }

    // PUT /api/parts/:id - Update part
    if (req.method === 'PUT') {
      const updates = req.body;

      let result;
      if (ObjectId.isValid(id)) {
        result = await partsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updates }
        );
      } else {
        result = await partsCollection.updateOne(
          { id: parseInt(id) },
          { $set: updates }
        );
      }

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Part not found' });
      }

      return res.status(200).json({ success: true });
    }

    // DELETE /api/parts/:id - Delete part
    if (req.method === 'DELETE') {
      let result;
      if (ObjectId.isValid(id)) {
        result = await partsCollection.deleteOne({ _id: new ObjectId(id) });
      } else {
        result = await partsCollection.deleteOne({ id: parseInt(id) });
      }

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Part not found' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
