/**
 * Real-Time Pricing Service
 *
 * This service fetches live prices from Amazon and updates the database.
 * You have several options for implementation:
 *
 * Option 1: Amazon Product Advertising API (Official, Requires Account)
 * Option 2: Web Scraping (Use with caution, may violate ToS)
 * Option 3: Third-party APIs (RapidAPI, etc.)
 */

import { updatePart } from '../utils/api';

// Type definitions
export interface PriceUpdate {
  apiId: string;
  price: number;
  originalPrice?: number;
  lastUpdated: Date;
  source: 'amazon' | 'manual' | 'api';
}

export interface AmazonProduct {
  ASIN: string;
  title: string;
  price: number;
  listPrice?: number;
  availability: boolean;
  lastChecked: Date;
}

/**
 * Option 1: Amazon Product Advertising API (Rainforest API via RapidAPI)
 * This is a paid service but very reliable
 * Sign up at: https://rapidapi.com/restyler/api/rainforest-api
 */
export async function fetchAmazonPriceViaRapidAPI(asin: string): Promise<AmazonProduct | null> {
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  if (!RAPIDAPI_KEY) {
    console.warn('RapidAPI key not configured. Set VITE_RAPIDAPI_KEY in .env');
    return null;
  }

  try {
    const response = await fetch(
      `https://rainforest-api.p.rapidapi.com/request?api_key=${RAPIDAPI_KEY}&type=product&amazon_domain=amazon.com&asin=${asin}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'rainforest-api.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.product) {
      return null;
    }

    return {
      ASIN: asin,
      title: data.product.title,
      price: data.product.buybox_winner?.price?.value || 0,
      listPrice: data.product.buybox_winner?.rrp?.value,
      availability: data.product.buybox_winner?.availability?.type === 'in_stock',
      lastChecked: new Date()
    };
  } catch (error) {
    console.error(`Error fetching price for ${asin}:`, error);
    return null;
  }
}

/**
 * Option 2: Alternative - Keepa API (Amazon Price History)
 * More affordable and provides price history
 * Sign up at: https://keepa.com/#!api
 */
export async function fetchAmazonPriceViaKeepa(asin: string): Promise<AmazonProduct | null> {
  const KEEPA_API_KEY = import.meta.env.VITE_KEEPA_API_KEY;

  if (!KEEPA_API_KEY) {
    console.warn('Keepa API key not configured. Set VITE_KEEPA_API_KEY in .env');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.keepa.com/product?key=${KEEPA_API_KEY}&domain=1&asin=${asin}&stats=1`
    );

    if (!response.ok) {
      throw new Error(`Keepa API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return null;
    }

    const product = data.products[0];
    const currentPrice = product.stats?.current?.[0] / 100; // Keepa returns prices in cents

    return {
      ASIN: asin,
      title: product.title,
      price: currentPrice || 0,
      listPrice: product.stats?.avg?.[0] / 100,
      availability: currentPrice > 0,
      lastChecked: new Date()
    };
  } catch (error) {
    console.error(`Error fetching price from Keepa for ${asin}:`, error);
    return null;
  }
}

/**
 * Option 3: ScraperAPI (General purpose scraping)
 * Works with Amazon but may need parsing
 * Sign up at: https://www.scraperapi.com/
 */
export async function fetchAmazonPriceViaScraper(asin: string): Promise<AmazonProduct | null> {
  const SCRAPER_API_KEY = import.meta.env.VITE_SCRAPER_API_KEY;

  if (!SCRAPER_API_KEY) {
    console.warn('ScraperAPI key not configured. Set VITE_SCRAPER_API_KEY in .env');
    return null;
  }

  try {
    const amazonUrl = `https://www.amazon.com/dp/${asin}`;
    const response = await fetch(
      `https://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(amazonUrl)}`
    );

    if (!response.ok) {
      throw new Error(`ScraperAPI error: ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML to extract price
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Try multiple price selectors (Amazon changes these frequently)
    const priceSelectors = [
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '.a-price-whole'
    ];

    let priceText = '';
    for (const selector of priceSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        priceText = element.textContent || '';
        break;
      }
    }

    if (!priceText) {
      return null;
    }

    // Extract numeric price
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

    return {
      ASIN: asin,
      title: doc.querySelector('#productTitle')?.textContent?.trim() || '',
      price: price || 0,
      availability: !html.includes('Currently unavailable'),
      lastChecked: new Date()
    };
  } catch (error) {
    console.error(`Error scraping price for ${asin}:`, error);
    return null;
  }
}

/**
 * Unified price fetcher - tries multiple sources
 */
export async function fetchRealTimePrice(asin: string): Promise<AmazonProduct | null> {
  // Try methods in order of preference
  let result = await fetchAmazonPriceViaRapidAPI(asin);

  if (!result) {
    result = await fetchAmazonPriceViaKeepa(asin);
  }

  if (!result) {
    result = await fetchAmazonPriceViaScraper(asin);
  }

  return result;
}

/**
 * Update a single part's price in the database
 */
export async function updatePartPrice(partId: string, asin: string): Promise<boolean> {
  try {
    const priceData = await fetchRealTimePrice(asin);

    if (!priceData || priceData.price === 0) {
      console.warn(`Could not fetch price for ${asin}`);
      return false;
    }

    await updatePart(partId, {
      price: priceData.price,
      originalPrice: priceData.listPrice,
      inStock: priceData.availability
    });

    console.log(`✅ Updated price for ${asin}: $${priceData.price}`);
    return true;
  } catch (error) {
    console.error(`Error updating price for ${partId}:`, error);
    return false;
  }
}

/**
 * Batch update all parts with prices
 */
export async function updateAllPartsPrices(parts: Array<{ _id: string; apiId: string }>): Promise<{
  updated: number;
  failed: number;
  total: number;
}> {
  const results = {
    updated: 0,
    failed: 0,
    total: parts.length
  };

  console.log(`🔄 Starting price update for ${parts.length} parts...`);

  for (const part of parts) {
    if (!part.apiId) {
      results.failed++;
      continue;
    }

    const success = await updatePartPrice(part._id, part.apiId);

    if (success) {
      results.updated++;
    } else {
      results.failed++;
    }

    // Rate limiting - wait 1 second between requests to avoid being blocked
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`✅ Price update complete: ${results.updated} updated, ${results.failed} failed`);
  return results;
}

/**
 * Schedule automatic price updates (runs in background)
 */
export function schedulePriceUpdates(
  parts: Array<{ _id: string; apiId: string }>,
  intervalHours: number = 24
): NodeJS.Timeout {
  const intervalMs = intervalHours * 60 * 60 * 1000;

  console.log(`⏰ Scheduling price updates every ${intervalHours} hours`);

  const intervalId = setInterval(async () => {
    console.log('🔄 Running scheduled price update...');
    await updateAllPartsPrices(parts);
  }, intervalMs);

  // Run immediately on first call
  updateAllPartsPrices(parts);

  return intervalId;
}

/**
 * Get price history (if using Keepa)
 */
export async function getPriceHistory(asin: string): Promise<Array<{ date: Date; price: number }> | null> {
  const KEEPA_API_KEY = import.meta.env.VITE_KEEPA_API_KEY;

  if (!KEEPA_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.keepa.com/product?key=${KEEPA_API_KEY}&domain=1&asin=${asin}&history=1`
    );

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return null;
    }

    const product = data.products[0];
    const priceHistory = product.csv?.[0] || []; // Amazon price history

    // Parse Keepa's CSV format
    const history: Array<{ date: Date; price: number }> = [];
    for (let i = 0; i < priceHistory.length; i += 2) {
      const timestamp = priceHistory[i]; // Minutes since Keepa epoch
      const price = priceHistory[i + 1]; // Price in cents

      if (price !== -1) { // -1 means no data
        const date = new Date((timestamp + 21564000) * 60000); // Keepa epoch
        history.push({
          date,
          price: price / 100
        });
      }
    }

    return history;
  } catch (error) {
    console.error(`Error fetching price history for ${asin}:`, error);
    return null;
  }
}

// Expose to window for easy testing
if (typeof window !== 'undefined') {
  (window as any).fetchRealTimePrice = fetchRealTimePrice;
  (window as any).updatePartPrice = updatePartPrice;
  (window as any).updateAllPartsPrices = updateAllPartsPrices;
  (window as any).getPriceHistory = getPriceHistory;
}
