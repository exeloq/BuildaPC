/**
 * Web Scraper for Retail Prices
 *
 * ⚠️ IMPORTANT LEGAL NOTICE:
 * - Web scraping may violate retailer Terms of Service
 * - This is intended for personal use and prototyping only
 * - Do not use for commercial purposes without permission
 * - Respect robots.txt and rate limits
 * - Consider using official APIs when available
 *
 * For production use:
 * - Get permission from retailers
 * - Use official APIs (e.g., Amazon Product Advertising API)
 * - Consider third-party price aggregation services
 */

interface ScrapedPrice {
  price: number;
  currency: string;
  inStock: boolean;
  title?: string;
}

/**
 * Fetch and parse HTML from a URL
 */
async function fetchHTML(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      // Don't throw for 404s - product might not exist or be discontinued
      if (response.status === 404) {
        throw new Error(
          `Product not found (404) - may be discontinued or invalid ID`,
        );
      }
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return await response.text();
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error("Request timeout after 10 seconds");
    }
    throw error;
  }
}

/**
 * Extract price from text using regex
 */
function extractPrice(text: string): number | null {
  // Match patterns like: $123.45, $1,234.56, 123.45
  const patterns = [
    /\$\s*([0-9,]+\.?[0-9]*)/, // $123.45 or $1,234.56
    /([0-9,]+\.[0-9]{2})/, // 123.45
    /\$\s*([0-9,]+)/, // $123
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const priceStr = match[1].replace(/,/g, "");
      const price = parseFloat(priceStr);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
  }

  return null;
}

/**
 * Scrape Amazon product page
 */
export async function scrapeAmazonPrice(
  asin: string,
): Promise<ScrapedPrice | null> {
  try {
    console.log(`🔍 Scraping Amazon ASIN: ${asin}`);

    const url = `https://www.amazon.com/dp/${asin}`;
    const html = await fetchHTML(url);

    // Look for price in multiple possible locations
    const pricePatterns = [
      /<span class="a-price-whole">([^<]+)<\/span>/,
      /<span id="priceblock_ourprice">([^<]+)<\/span>/,
      /<span id="priceblock_dealprice">([^<]+)<\/span>/,
      /<span class="a-offscreen">([^<]+)<\/span>/,
      /data-a-color="price">([^<]+)<\/span>/,
    ];

    let priceText = null;
    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        priceText = match[1];
        break;
      }
    }

    if (!priceText) {
      // Try to find any price in the page
      const priceMatch = html.match(/\$[\s]*[0-9,]+\.?[0-9]*/);
      if (priceMatch) {
        priceText = priceMatch[0];
      }
    }

    if (priceText) {
      const price = extractPrice(priceText);
      if (price) {
        // Check stock status
        const inStock =
          !html.includes("Currently unavailable") &&
          !html.includes("Out of Stock");

        console.log(`✅ Amazon price found: $${price}`);
        return {
          price,
          currency: "USD",
          inStock,
        };
      }
    }

    console.log(
      `⚠️  No price found for Amazon ASIN: ${asin} (product may not exist or be discontinued)`,
    );
    return null;
  } catch (error) {
    // Log 404s as warnings, not errors
    if (
      error instanceof Error &&
      error.message.includes("404")
    ) {
      console.warn(
        `⚠️  Amazon product not found: ${asin} - ${error.message}`,
      );
    } else {
      console.error(`❌ Error scraping Amazon ${asin}:`, error);
    }
    return null;
  }
}

/**
 * Scrape Newegg product page
 */
export async function scrapeNeweggPrice(
  itemNumber: string,
): Promise<ScrapedPrice | null> {
  try {
    console.log(`🔍 Scraping Newegg Item: ${itemNumber}`);

    const url = `https://www.newegg.com/p/${itemNumber}`;
    const html = await fetchHTML(url);

    // Newegg price patterns
    const pricePatterns = [
      /<li class="price-current"[^>]*>[\s\S]*?\$([0-9,]+)\.?([0-9]*)/,
      /class="price-current-label"[\s\S]*?\$([0-9,]+)\.?([0-9]*)/,
      /"FinalPrice"\s*:\s*"([^"]+)"/,
      /data-price="([^"]+)"/,
    ];

    let price = null;
    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        if (match[2] !== undefined) {
          // Has cents
          const dollars = match[1].replace(/,/g, "");
          const cents = match[2] || "00";
          price = parseFloat(`${dollars}.${cents}`);
        } else {
          price = extractPrice(match[1]);
        }
        if (price) break;
      }
    }

    if (price) {
      // Check stock
      const inStock =
        !html.includes("OUT OF STOCK") &&
        !html.includes("SOLD OUT") &&
        html.includes("ADD TO CART");

      console.log(`✅ Newegg price found: $${price}`);
      return {
        price,
        currency: "USD",
        inStock,
      };
    }

    console.log(
      `❌ No price found for Newegg item: ${itemNumber}`,
    );
    return null;
  } catch (error) {
    console.error(
      `❌ Error scraping Newegg ${itemNumber}:`,
      error,
    );
    return null;
  }
}

/**
 * Scrape Best Buy product page
 */
export async function scrapeBestBuyPrice(
  sku: string,
): Promise<ScrapedPrice | null> {
  try {
    console.log(`🔍 Scraping Best Buy SKU: ${sku}`);

    const url = `https://www.bestbuy.com/site/${sku}.p?skuId=${sku}`;
    const html = await fetchHTML(url);

    // Best Buy price patterns
    const pricePatterns = [
      /data-customer-price="\$([^"]+)"/,
      /priceView-customer-price"[^>]*>\s*\$([0-9,]+\.?[0-9]*)/,
      /"currentPrice"\s*:\s*([0-9.]+)/,
      /class="priceView-hero-price priceView-customer-price"[^>]*>\s*<span[^>]*>([^<]+)</,
    ];

    let price = null;
    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        price = extractPrice(match[1]);
        if (price) break;
      }
    }

    if (price) {
      // Check stock
      const inStock =
        html.includes("Add to Cart") &&
        !html.includes("Sold Out") &&
        !html.includes("Coming Soon");

      console.log(`✅ Best Buy price found: $${price}`);
      return {
        price,
        currency: "USD",
        inStock,
      };
    }

    console.log(`❌ No price found for Best Buy SKU: ${sku}`);
    return null;
  } catch (error) {
    console.error(`❌ Error scraping Best Buy ${sku}:`, error);
    return null;
  }
}

/**
 * Generic scraper that tries to find price on any product page
 */
export async function scrapeGenericPrice(
  url: string,
): Promise<ScrapedPrice | null> {
  try {
    console.log(`🔍 Scraping generic URL: ${url}`);

    const html = await fetchHTML(url);

    // Look for common price patterns in HTML
    const pricePatterns = [
      /\$\s*([0-9,]+\.[0-9]{2})/g,
      /"price"\s*:\s*"?\$?([0-9,]+\.?[0-9]*)"/,
      /data-price="([^"]+)"/,
      /itemprop="price"[^>]*content="([^"]+)"/,
    ];

    const foundPrices: number[] = [];

    for (const pattern of pricePatterns) {
      const matches = html.matchAll(pattern);
      for (const match of matches) {
        const price = extractPrice(match[1]);
        if (price && price > 10 && price < 10000) {
          // Reasonable price range
          foundPrices.push(price);
        }
      }
    }

    if (foundPrices.length > 0) {
      // Use the most common price or median
      foundPrices.sort((a, b) => a - b);
      const price =
        foundPrices[Math.floor(foundPrices.length / 2)];

      console.log(`✅ Generic scraper found price: $${price}`);
      return {
        price,
        currency: "USD",
        inStock: true, // Assume in stock if we can see a price
      };
    }

    console.log(`❌ No price found on generic URL`);
    return null;
  } catch (error) {
    console.error(`❌ Error scraping generic URL:`, error);
    return null;
  }
}

/**
 * Rate limiter to avoid overwhelming servers
 */
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

export async function rateLimitedScrape<T>(
  scrapeFn: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`⏱️  Rate limiting: waiting ${delay}ms`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  lastRequestTime = Date.now();
  return await scrapeFn();
}