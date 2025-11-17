import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Helper to get all parts from KV store
async function getAllParts() {
  const parts = await kv.getByPrefix("part:");
  return parts.map(p => p.value);
}

// Helper to get part by ID
async function getPartById(id: string) {
  return await kv.get(`part:${id}`);
}

// Helper to generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get all parts or filter by category
app.get("/make-server-9488d537/parts", async (c) => {
  try {
    const category = c.req.query("category");
    const search = c.req.query("search");
    const limit = parseInt(c.req.query("limit") || "50");
    const skip = parseInt(c.req.query("skip") || "0");

    let parts = await getAllParts();

    // Filter by category
    if (category) {
      parts = parts.filter(p => p.category === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      parts = parts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
      );
    }

    const total = parts.length;
    const paginatedParts = parts.slice(skip, skip + limit);

    return c.json({
      parts: paginatedParts,
      total,
      skip,
      limit,
    });
  } catch (error) {
    console.error("Error fetching parts:", error);
    return c.json({ error: "Failed to fetch parts", message: String(error) }, 500);
  }
});

// Get a single part by ID
app.get("/make-server-9488d537/parts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const part = await getPartById(id);

    if (!part) {
      return c.json({ error: "Part not found" }, 404);
    }

    return c.json(part);
  } catch (error) {
    console.error("Error fetching part:", error);
    return c.json({ error: "Failed to fetch part", message: String(error) }, 500);
  }
});

// Add a new part
app.post("/make-server-9488d537/parts", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || generateId();
    
    const part = {
      ...body,
      id,
      _id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`part:${id}`, part);

    return c.json({
      success: true,
      id: id,
    });
  } catch (error) {
    console.error("Error adding part:", error);
    return c.json({ error: "Failed to add part", message: String(error) }, 500);
  }
});

// Bulk insert parts (useful for initial data population)
app.post("/make-server-9488d537/parts/bulk", async (c) => {
  try {
    const body = await c.req.json();
    const parts = body.parts;

    if (!Array.isArray(parts)) {
      return c.json({ error: "Parts must be an array" }, 400);
    }

    const kvPairs: Record<string, any> = {};
    const insertedIds: string[] = [];

    for (const part of parts) {
      const id = part.id?.toString() || generateId();
      const partWithMeta = {
        ...part,
        id,
        _id: id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      kvPairs[`part:${id}`] = partWithMeta;
      insertedIds.push(id);
    }

    await kv.mset(kvPairs);

    return c.json({
      success: true,
      insertedCount: parts.length,
      insertedIds: insertedIds,
    });
  } catch (error) {
    console.error("Error bulk inserting parts:", error);
    return c.json({ error: "Failed to bulk insert parts", message: String(error) }, 500);
  }
});

// Update a part
app.put("/make-server-9488d537/parts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingPart = await getPartById(id);
    if (!existingPart) {
      return c.json({ error: "Part not found" }, 404);
    }

    const updatedPart = {
      ...existingPart,
      ...body,
      id,
      _id: id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`part:${id}`, updatedPart);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating part:", error);
    return c.json({ error: "Failed to update part", message: String(error) }, 500);
  }
});

// Delete a part
app.delete("/make-server-9488d537/parts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingPart = await getPartById(id);
    if (!existingPart) {
      return c.json({ error: "Part not found" }, 404);
    }

    await kv.del(`part:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting part:", error);
    return c.json({ error: "Failed to delete part", message: String(error) }, 500);
  }
});

// Get categories
app.get("/make-server-9488d537/categories", async (c) => {
  try {
    const parts = await getAllParts();
    const categories = [...new Set(parts.map(p => p.category))];

    return c.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return c.json({ error: "Failed to fetch categories", message: String(error) }, 500);
  }
});

// Health check endpoint
app.get("/make-server-9488d537/health", async (c) => {
  try {
    const parts = await getAllParts();
    return c.json({
      status: "ok",
      database: "Supabase KV Store",
      partsCount: parts.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      status: "error",
      error: String(error),
      timestamp: new Date().toISOString()
    }, 500);
  }
});

export default app;