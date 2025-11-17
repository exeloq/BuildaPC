import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1`;

interface PricingResponse {
  success: boolean;
  prices: Record<string, number>;
  cached?: number;
  fetched?: number;
  error?: string;
}

/**
 * Fetch real-time prices for products
 * @param productIds Array of product IDs (e.g., ASINs for Amazon)
 * @returns Object mapping product IDs to prices
 */
export async function fetchProductPrices(
  productIds: string[]
): Promise<Record<string, number>> {
  try {
    const response = await fetch(`${API_BASE_URL}/make-server-9488d537/products/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ productIds }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Pricing API error:', errorData);
      throw new Error(errorData.error || 'Failed to fetch prices');
    }

    const data: PricingResponse = await response.json();
    
    if (data.success) {
      console.log(
        `Fetched prices: ${data.fetched || 0} new, ${data.cached || 0} cached`
      );
      return data.prices;
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error fetching product prices:', error);
    // Return empty object on error - fallback to default prices
    return {};
  }
}

/**
 * Manually update a product price (admin function)
 * @param productId Product ID
 * @param price New price
 */
export async function updateProductPrice(
  productId: string,
  price: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/make-server-9488d537/products/prices/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ productId, price }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update price');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error updating product price:', error);
    return false;
  }
}

/**
 * Clear the price cache
 */
export async function clearPriceCache(): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/make-server-9488d537/products/prices/cache`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to clear cache');
    }

    const data = await response.json();
    console.log(data.message);
    return data.success;
  } catch (error) {
    console.error('Error clearing price cache:', error);
    return false;
  }
}
