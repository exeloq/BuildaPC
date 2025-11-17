import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import pricingRoutes from "./pricing.tsx";
import partsRoutes from "./parts.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9488d537/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount pricing routes
app.route("/", pricingRoutes);

// Mount parts routes
app.route("/", partsRoutes);

Deno.serve(app.fetch);