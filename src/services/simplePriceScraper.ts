/**
 * Simple Price Scraper - No API Keys Required!
 *
 * This scrapes Amazon prices directly without needing paid APIs.
 *
 * IMPORTANT NOTES:
 * - This is for educational/personal use
 * - Amazon may block excessive requests
 * - Use responsibly with delays between requests
 * - Consider using a CORS proxy for browser-based scraping
 */

import { updatePart } from '../utils/api';

export interface ScrapedPrice {
  asin: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  title: string;
  lastUpdated: Date;
}

/**
 * Simple direct scraping (works from server-side)
 */
export async function scrapeAmazonPrice(asin: string): Promise<ScrapedPrice | null> {
  try {
    const url = `https://www.amazon.com/dp/${asin}`;

    // Use a CORS proxy for browser requests
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Extract price using multiple patterns
    const price = extractPrice(html);
    const originalPrice = extractOriginalPrice(html);
    const title = extractTitle(html);
    const inStock = !html.includes('Currently unavailable') &&
                    !html.includes('Out of Stock');

    if (!price || price === 0) {
      console.warn(`Could not extract price for ${asin}`);
      return null;
    }

    return {
      asin,
      price,
      originalPrice,
      inStock,
      title: title || '',
      lastUpdated: new Date()
    };

  } catch (error) {
    console.error(`Error scraping ${asin}:`, error);
    return null;
  }
}

/**
 * Extract price from HTML using multiple patterns
 */
function extractPrice(html: string): number {
  // Try multiple price patterns (Amazon changes these often)
  const patterns = [
    // Pattern 1: <span class="a-price-whole">499</span><span class="a-price-fraction">99</span>
    /<span class="a-price-whole">(\d+)<\/span><span class="a-price-fraction">(\d+)<\/span>/,

    // Pattern 2: <span class="a-offscreen">$499.99</span>
    /<span class="a-offscreen">\$?([\d,]+\.?\d*)<\/span>/,

    // Pattern 3: id="priceblock_ourprice">$499.99</span>
    /id="priceblock_ourprice"[^>]*>\$?([\d,]+\.?\d*)<\/span>/,

    // Pattern 4: id="priceblock_dealprice">$499.99</span>
    /id="priceblock_dealprice"[^>]*>\$?([\d,]+\.?\d*)<\/span>/,

    // Pattern 5: "price":"499.99"
    /"price":"([\d,]+\.?\d*)"/,

    // Pattern 6: Buy for $499.99
    /Buy for \$?([\d,]+\.?\d*)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      if (match[2]) {
        // Whole and fraction parts
        return parseFloat(`${match[1]}.${match[2]}`);
      } else {
        // Single price value
        return parseFloat(match[1].replace(/,/g, ''));
      }
    }
  }

  return 0;
}

/**
 * Extract original/list price
 */
function extractOriginalPrice(html: string): number | undefined {
  const patterns = [
    /List Price:.*?\$?([\d,]+\.?\d*)/,
    /Was:.*?\$?([\d,]+\.?\d*)/,
    /"listPrice":"([\d,]+\.?\d*)"/,
    /class="a-text-price".*?\$?([\d,]+\.?\d*)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return parseFloat(match[1].replace(/,/g, ''));
    }
  }

  return undefined;
}

/**
 * Extract product title
 */
function extractTitle(html: string): string | undefined {
  const patterns = [
    /<span id="productTitle"[^>]*>([^<]+)<\/span>/,
    /<h1[^>]*>([^<]+)<\/h1>/,
    /"title":"([^"]+)"/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Update multiple parts with scraped prices
 */
export async function scrapeAndUpdatePrices(
  parts: Array<{ _id: string; apiId: string }>
): Promise<{ updated: number; failed: number }> {

  const results = { updated: 0, failed: 0 };

  console.log(`🔍 Starting to scrape prices for ${parts.length} parts...`);

  for (const part of parts) {
    if (!part.apiId) {
      results.failed++;
      continue;
    }

    try {
      console.log(`Scraping ${part.apiId}...`);

      const priceData = await scrapeAmazonPrice(part.apiId);

      if (priceData && priceData.price > 0) {
        await updatePart(part._id, {
          price: priceData.price,
          originalPrice: priceData.originalPrice,
          inStock: priceData.inStock
        });

        console.log(`✅ Updated ${part.apiId}: $${priceData.price}`);
        results.updated++;
      } else {
        console.warn(`⚠️ No price found for ${part.apiId}`);
        results.failed++;
      }

      // IMPORTANT: Wait 2-3 seconds between requests to avoid being blocked
      await new Promise(resolve => setTimeout(resolve, 2500));

    } catch (error) {
      console.error(`❌ Error scraping ${part.apiId}:`, error);
      results.failed++;
    }
  }

  console.log(`\n📊 Scraping complete!`);
  console.log(`   ✅ Updated: ${results.updated}`);
  console.log(`   ❌ Failed: ${results.failed}`);

  return results;
}

/**
 * Test scraping for a single product
 */
export async function testScrape(asin: string = 'B0BBHD8Q8G') {
  console.log(`🧪 Testing scraper with ASIN: ${asin}`);
  const result = await scrapeAmazonPrice(asin);

  if (result) {
    console.log('✅ Scraping successful!');
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('❌ Scraping failed - check console for errors');
  }

  return result;
}

// Expose to window for testing
if (typeof window !== 'undefined') {
  (window as any).scrapeAmazonPrice = scrapeAmazonPrice;
  (window as any).scrapeAndUpdatePrices = scrapeAndUpdatePrices;
  (window as any).testScrape = testScrape;
}
