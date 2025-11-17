import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";
import { 
  scrapeAmazonPrice, 
  scrapeNeweggPrice, 
  scrapeBestBuyPrice,
  scrapeGenericPrice,
  rateLimitedScrape 
} from "./scrapers.tsx";

const app = new Hono();

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

/**
 * Demo/Mock pricing data for testing
 * Returns realistic price variations (±15% from base)
 */
function generateDemoPrices(productIds: string[]): Record<string, number> {
  console.log("🎭 Demo mode: Generating mock prices for", productIds.length, "products");
  
  const basePrices: Record<string, number> = {
    "B0BBHD8Q8G": 549,  // AMD Ryzen 9 7950X
    "B0BM5XFHN3": 1199, // RTX 4080
    "B0BQRYWXX3": 139,  // Corsair RAM
    "B0BG6M53DG": 449,  // ASUS Motherboard
    "B0BHJJ9Y77": 189,  // Samsung SSD
    "B09M3Z7N9K": 189,  // Corsair Cooler
    "B079H6111J": 134,  // Corsair PSU
    "B0CHBJMNJ9": 409,  // Intel i7
    "B0BPWKL1RC": 799,  // RTX 4070 Ti
    "B0BMT4C77Z": 279,  // G.Skill RAM
    "B0BHR7SZ6Q": 219,  // MSI Motherboard
    "B0B7CPSN2K": 349,  // WD SSD
  };

  const prices: Record<string, number> = {};
  
  for (const id of productIds) {
    const basePrice = basePrices[id] || 99;
    // Add realistic variation: ±15%
    const variation = (Math.random() - 0.5) * 0.3; // -15% to +15%
    const newPrice = Math.round(basePrice * (1 + variation));
    prices[id] = newPrice;
  }

  return prices;
}

/**
 * Fetch prices from external sources
 * Supports: web scraping (amazon, newegg, bestbuy), demo mode
 */
async function fetchPricesFromAPI(productIds: string[]): Promise<Record<string, number>> {
  const apiProvider = Deno.env.get("PRODUCT_API_PROVIDER") || "scraper";
  const useRealPrices = Deno.env.get("USE_REAL_PRICES") !== "false";
  
  // Demo mode - return mock prices
  if (!useRealPrices || apiProvider.toLowerCase() === "demo") {
    console.log("📊 Using demo mode for pricing");
    return generateDemoPrices(productIds);
  }

  try {
    console.log(`\n🔍 ===== REAL PRICING MODE ACTIVE =====`);
    console.log(`📡 Provider: ${apiProvider}`);
    console.log(`📦 Products: ${productIds.length}`);
    console.log(`⏱️  Rate limit: 2 seconds between requests`);
    console.log(`⚠️  Legal: Personal/educational use only`);
    console.log(`=====================================\n`);
    
    switch (apiProvider.toLowerCase()) {
      case "scraper":
      case "scrape":
        return await scrapeProductPrices(productIds);
      case "amazon":
        return await scrapeAmazonPrices(productIds);
      case "newegg":
        return await scrapeNeweggPrices(productIds);
      case "bestbuy":
        return await scrapeBestBuyPrices(productIds);
      default:
        console.log(`❌ Unknown provider: ${apiProvider}, using scraper mode`);
        return await scrapeProductPrices(productIds);
    }
  } catch (error) {
    console.error(`❌ Error fetching prices from ${apiProvider}:`, error);
    console.log("🔄 Falling back to demo mode");
    return generateDemoPrices(productIds);
  }
}

/**
 * Scrape prices from multiple retailers
 * Product IDs should be in format: "platform:id" (e.g., "amazon:B0BBHD8Q8G")
 * or just the ID (will try to detect platform)
 */
async function scrapeProductPrices(productIds: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  // Process products with rate limiting
  for (const productId of productIds) {
    try {
      const { platform, id } = parseProductId(productId);
      
      const result = await rateLimitedScrape(async () => {
        switch (platform) {
          case "amazon":
            return await scrapeAmazonPrice(id);
          case "newegg":
            return await scrapeNeweggPrice(id);
          case "bestbuy":
            return await scrapeBestBuyPrice(id);
          default:
            console.log(`⚠️  Unknown platform for ${productId}, skipping`);
            return null;
        }
      });

      if (result && result.price) {
        prices[productId] = result.price;
        console.log(`✅ Got price for ${productId}: $${result.price}`);
      }
    } catch (error) {
      console.error(`❌ Error scraping ${productId}:`, error);
    }
  }

  return prices;
}

/**
 * Parse product ID to extract platform and ID
 * Formats supported:
 * - "amazon:B0BBHD8Q8G" -> { platform: "amazon", id: "B0BBHD8Q8G" }
 * - "B0BBHD8Q8G" -> { platform: "amazon", id: "B0BBHD8Q8G" } (detected)
 */
function parseProductId(productId: string): { platform: string; id: string } {
  // Check if format is "platform:id"
  if (productId.includes(":")) {
    const [platform, id] = productId.split(":", 2);
    return { platform: platform.toLowerCase(), id };
  }

  // Auto-detect platform based on ID format
  // Amazon ASINs: 10 characters, alphanumeric (e.g., B0BBHD8Q8G)
  if (/^B[0-9A-Z]{9}$/i.test(productId)) {
    return { platform: "amazon", id: productId };
  }

  // Newegg item numbers: Usually start with N82E or have specific format
  if (productId.includes("-") || /^[A-Z0-9]{3,}/i.test(productId)) {
    return { platform: "newegg", id: productId };
  }

  // Best Buy SKUs: Usually numeric
  if (/^\d{7,}$/.test(productId)) {
    return { platform: "bestbuy", id: productId };
  }

  // Default to Amazon if can't detect
  return { platform: "amazon", id: productId };
}

/**
 * Scrape only Amazon prices
 */
async function scrapeAmazonPrices(productIds: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  for (const productId of productIds) {
    try {
      const result = await rateLimitedScrape(() => scrapeAmazonPrice(productId));
      if (result && result.price) {
        prices[productId] = result.price;
      }
    } catch (error) {
      console.error(`Error scraping Amazon ${productId}:`, error);
    }
  }

  return prices;
}

/**
 * Scrape only Newegg prices
 */
async function scrapeNeweggPrices(productIds: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  for (const productId of productIds) {
    try {
      const result = await rateLimitedScrape(() => scrapeNeweggPrice(productId));
      if (result && result.price) {
        prices[productId] = result.price;
      }
    } catch (error) {
      console.error(`Error scraping Newegg ${productId}:`, error);
    }
  }

  return prices;
}

/**
 * Scrape only Best Buy prices
 */
async function scrapeBestBuyPrices(productIds: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  for (const productId of productIds) {
    try {
      const result = await rateLimitedScrape(() => scrapeBestBuyPrice(productId));
      if (result && result.price) {
        prices[productId] = result.price;
      }
    } catch (error) {
      console.error(`Error scraping Best Buy ${productId}:`, error);
    }
  }

  return prices;
}



/**
 * Get cached prices or fetch new ones
 */
app.post("/make-server-9488d537/products/prices", async (c) => {
  try {
    const body = await c.req.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds)) {
      return c.json({ error: "productIds array is required" }, 400);
    }

    // Check cache first
    const cachedPrices: Record<string, number> = {};
    const uncachedIds: string[] = [];

    for (const id of productIds) {
      const cacheKey = `price:${id}`;
      const cached = await kv.get(cacheKey);
      
      if (cached) {
        cachedPrices[id] = cached as number;
      } else {
        uncachedIds.push(id);
      }
    }

    // Fetch uncached prices
    let fetchedPrices: Record<string, number> = {};
    if (uncachedIds.length > 0) {
      fetchedPrices = await fetchPricesFromAPI(uncachedIds);
      
      // Cache the fetched prices
      for (const [id, price] of Object.entries(fetchedPrices)) {
        const cacheKey = `price:${id}`;
        await kv.set(cacheKey, price);
        
        // Set expiration (we'll use a timestamp approach)
        const expiryKey = `price:${id}:expiry`;
        await kv.set(expiryKey, Date.now() + CACHE_DURATION * 1000);
      }
    }

    // Combine cached and fetched prices
    const allPrices = { ...cachedPrices, ...fetchedPrices };

    return c.json({
      success: true,
      prices: allPrices,
      cached: Object.keys(cachedPrices).length,
      fetched: Object.keys(fetchedPrices).length,
    });
  } catch (error) {
    console.error("Error in /products/prices endpoint:", error);
    return c.json(
      { 
        error: "Failed to fetch product prices",
        details: error instanceof Error ? error.message : String(error)
      },
      500
    );
  }
});

/**
 * Manual price update endpoint (for admin use)
 */
app.post("/make-server-9488d537/products/prices/update", async (c) => {
  try {
    const body = await c.req.json();
    const { productId, price } = body;

    if (!productId || typeof price !== "number") {
      return c.json({ error: "productId and price are required" }, 400);
    }

    const cacheKey = `price:${productId}`;
    await kv.set(cacheKey, price);
    
    const expiryKey = `price:${productId}:expiry`;
    await kv.set(expiryKey, Date.now() + CACHE_DURATION * 1000);

    return c.json({
      success: true,
      message: `Price updated for product ${productId}`,
    });
  } catch (error) {
    console.error("Error in /products/prices/update endpoint:", error);
    return c.json(
      { error: "Failed to update product price" },
      500
    );
  }
});

/**
 * Clear price cache endpoint
 */
app.delete("/make-server-9488d537/products/prices/cache", async (c) => {
  try {
    const priceKeys = await kv.getByPrefix("price:");
    
    for (const key of priceKeys) {
      await kv.del(key.key);
    }

    return c.json({
      success: true,
      message: `Cleared ${priceKeys.length} cached prices`,
    });
  } catch (error) {
    console.error("Error clearing price cache:", error);
    return c.json({ error: "Failed to clear price cache" }, 500);
  }
});

export default app;
