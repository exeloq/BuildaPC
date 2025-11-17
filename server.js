// Simple MongoDB API Server for PC Parts
// Run this with: node server.js

import { MongoClient, ObjectId } from 'mongodb';
import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://avnorboev:carrotman33@cluster0.azsklpr.mongodb.net/?appName=Cluster0';
const PORT = process.env.PORT || 3002;

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('✅ Connected to MongoDB');
  cachedClient = client;
  return client;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const server = createServer(async (req, res) => {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API routes
  if (pathname.startsWith('/parts') || pathname.startsWith('/categories')) {
    try {
    const client = await getMongoClient();
    const db = client.db('PCParts');
    const partsCollection = db.collection('parts');

    // GET /parts - List parts
    if (pathname === '/parts' && req.method === 'GET') {
      const { category, search, limit = '50', skip = '0' } = parsedUrl.query;

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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ parts, total, skip: parseInt(skip), limit: parseInt(limit) }));
      return;
    }

    // GET /parts/:id - Get single part
    if (pathname.match(/^\/parts\/[^\/]+$/) && req.method === 'GET') {
      const id = pathname.split('/')[2];

      let part = null;
      if (ObjectId.isValid(id)) {
        part = await partsCollection.findOne({ _id: new ObjectId(id) });
      }
      if (!part) {
        part = await partsCollection.findOne({ id: parseInt(id) });
      }

      if (!part) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Part not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(part));
      return;
    }

    // POST /parts - Add single part
    if (pathname === '/parts' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        const part = JSON.parse(body);
        const result = await partsCollection.insertOne(part);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, id: result.insertedId.toString() }));
      });
      return;
    }

    // POST /parts/bulk - Bulk add parts
    if (pathname === '/parts/bulk' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        const { parts } = JSON.parse(body);
        const result = await partsCollection.insertMany(parts);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, insertedCount: result.insertedCount }));
      });
      return;
    }

    // PUT /parts/:id - Update part
    if (pathname.match(/^\/parts\/[^\/]+$/) && req.method === 'PUT') {
      const id = pathname.split('/')[2];
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        const updates = JSON.parse(body);

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
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Part not found' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
      return;
    }

    // DELETE /parts/:id - Delete part
    if (pathname.match(/^\/parts\/[^\/]+$/) && req.method === 'DELETE') {
      const id = pathname.split('/')[2];

      let result;
      if (ObjectId.isValid(id)) {
        result = await partsCollection.deleteOne({ _id: new ObjectId(id) });
      } else {
        result = await partsCollection.deleteOne({ id: parseInt(id) });
      }

      if (result.deletedCount === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Part not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }

    // GET /categories - List categories
    if (pathname === '/categories' && req.method === 'GET') {
      const categories = await partsCollection.distinct('category');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ categories }));
      return;
    }

    // API 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));

    } catch (error) {
      console.error('API Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  // Serve static files for all other routes
  const distPath = join(__dirname, 'dist');

  if (existsSync(distPath)) {
    let filePath = join(distPath, pathname === '/' ? 'index.html' : pathname);

    // If file doesn't exist, serve index.html for client-side routing
    if (!existsSync(filePath)) {
      filePath = join(distPath, 'index.html');
    }

    if (existsSync(filePath)) {
      const ext = filePath.split('.').pop();
      const contentTypes = {
        'html': 'text/html',
        'js': 'application/javascript',
        'css': 'text/css',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
        'eot': 'application/vnd.ms-fontobject'
      };

      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
      return;
    }
  }

  // Final fallback 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB Database: PCParts`);
  console.log(`📦 Collection: parts`);
  console.log('\nAvailable endpoints:');
  console.log(`  GET    http://localhost:${PORT}/parts`);
  console.log(`  GET    http://localhost:${PORT}/parts/:id`);
  console.log(`  POST   http://localhost:${PORT}/parts`);
  console.log(`  POST   http://localhost:${PORT}/parts/bulk`);
  console.log(`  PUT    http://localhost:${PORT}/parts/:id`);
  console.log(`  DELETE http://localhost:${PORT}/parts/:id`);
  console.log(`  GET    http://localhost:${PORT}/categories`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  if (cachedClient) {
    await cachedClient.close();
  }
  process.exit(0);
});
