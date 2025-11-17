import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient, ObjectId } from "npm:mongodb@6.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// MongoDB connection
const MONGODB_URI = Deno.env.get('MONGODB_URI') || '';
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    const client = await getMongoClient();
    const db = client.db('PCParts');
    const partsCollection = db.collection('parts');

    // GET /parts - List parts with optional filtering
    if (path.endsWith('/parts') && req.method === 'GET') {
      const category = url.searchParams.get('category');
      const search = url.searchParams.get('search');
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const skip = parseInt(url.searchParams.get('skip') || '0');

      const filter: any = {};

      if (category) {
        filter.category = category;
      }

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
        .skip(skip)
        .limit(limit)
        .toArray();

      return new Response(
        JSON.stringify({
          parts,
          total,
          skip,
          limit
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // GET /parts/:id - Get single part
    if (path.match(/\/parts\/[^\/]+$/) && req.method === 'GET') {
      const id = path.split('/').pop();

      let part;
      if (ObjectId.isValid(id!)) {
        part = await partsCollection.findOne({ _id: new ObjectId(id) });
      }

      if (!part) {
        part = await partsCollection.findOne({ id: parseInt(id!) });
      }

      if (!part) {
        return new Response(
          JSON.stringify({ error: 'Part not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(JSON.stringify(part), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST /parts - Add single part
    if (path.endsWith('/parts') && req.method === 'POST') {
      const part = await req.json();

      const result = await partsCollection.insertOne(part);

      return new Response(
        JSON.stringify({
          success: true,
          id: result.insertedId.toString()
        }),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // POST /parts/bulk - Bulk add parts
    if (path.endsWith('/parts/bulk') && req.method === 'POST') {
      const { parts } = await req.json();

      const result = await partsCollection.insertMany(parts);

      return new Response(
        JSON.stringify({
          success: true,
          insertedCount: result.insertedCount
        }),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // PUT /parts/:id - Update part
    if (path.match(/\/parts\/[^\/]+$/) && req.method === 'PUT') {
      const id = path.split('/').pop();
      const updates = await req.json();

      let result;
      if (ObjectId.isValid(id!)) {
        result = await partsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updates }
        );
      } else {
        result = await partsCollection.updateOne(
          { id: parseInt(id!) },
          { $set: updates }
        );
      }

      if (result.matchedCount === 0) {
        return new Response(
          JSON.stringify({ error: 'Part not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // DELETE /parts/:id - Delete part
    if (path.match(/\/parts\/[^\/]+$/) && req.method === 'DELETE') {
      const id = path.split('/').pop();

      let result;
      if (ObjectId.isValid(id!)) {
        result = await partsCollection.deleteOne({ _id: new ObjectId(id) });
      } else {
        result = await partsCollection.deleteOne({ id: parseInt(id!) });
      }

      if (result.deletedCount === 0) {
        return new Response(
          JSON.stringify({ error: 'Part not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // GET /categories - List all unique categories
    if (path.endsWith('/categories') && req.method === 'GET') {
      const categories = await partsCollection.distinct('category');

      return new Response(
        JSON.stringify({ categories }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 404 - Route not found
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
