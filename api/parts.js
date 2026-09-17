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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await getMongoClient();
    const db = client.db('PCParts');
    const partsCollection = db.collection('parts');

    // GET /api/parts - List parts
    if (req.method === 'GET') {
      const { category, search, limit = '50', skip = '0' } = req.query;

      const filter = {};
      if (category) filter.category = category;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await partsCollection.countDocuments(filter);
      const parts = await partsCollection
        .find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .toArray();

      return res.status(200).json({
        parts,
        total,
        skip: parseInt(skip),
        limit: parseInt(limit)
      });
    }

    // POST /api/parts - Add single part
    if (req.method === 'POST') {
      const part = req.body;
      const result = await partsCollection.insertOne(part);
      return res.status(201).json({
        success: true,
        id: result.insertedId.toString()
      });
    }

    // PUT /api/parts - Update part (expects id in body)
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;

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

    // DELETE /api/parts - Delete part (expects id in query)
    if (req.method === 'DELETE') {
      const { id } = req.query;

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
