import { projectId, publicAnonKey } from './supabase/info';

// Use local server for development, Supabase Edge Function for production
const API_BASE = import.meta.env.DEV
  ? 'http://localhost:3002'
  : `https://${projectId}.supabase.co/functions/v1/make-server-9488d537`;

export interface Part {
  _id?: string;
  id?: number;
  apiId?: string; // For real pricing integration
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  imageUrl: string;
  category: string;
  inStock?: boolean;
  specs?: string[];
  description?: string;
  // Purchase links
  purchaseLinks?: {
    amazon?: string;
    newegg?: string;
    bestbuy?: string;
  };
}

export interface PartsResponse {
  parts: Part[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchParts(options?: {
  category?: string;
  search?: string;
  limit?: number;
  skip?: number;
}): Promise<PartsResponse> {
  const params = new URLSearchParams();
  
  if (options?.category) params.append('category', options.category);
  if (options?.search) params.append('search', options.search);
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.skip) params.append('skip', options.skip.toString());

  try {
    const headers: HeadersInit = {};
    if (!import.meta.env.DEV) {
      headers['Authorization'] = `Bearer ${publicAnonKey}`;
    }

    const response = await fetch(`${API_BASE}/parts?${params.toString()}`, {
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.error || response.statusText;
      throw new Error(`Failed to fetch parts: ${errorMessage}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error fetching parts:', error);
    // Return empty result instead of throwing to allow graceful degradation
    return {
      parts: [],
      total: 0,
      skip: 0,
      limit: options?.limit || 50
    };
  }
}

export async function fetchPartById(id: string): Promise<Part> {
  const headers: HeadersInit = {};
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/parts/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch part: ${response.statusText}`);
  }

  return response.json();
}

export async function addPart(part: Omit<Part, '_id'>): Promise<{ success: boolean; id: string }> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/parts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(part),
  });

  if (!response.ok) {
    throw new Error(`Failed to add part: ${response.statusText}`);
  }

  return response.json();
}

export async function bulkAddParts(parts: Omit<Part, '_id'>[]): Promise<{ success: boolean; insertedCount: number }> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/parts/bulk`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ parts }),
  });

  if (!response.ok) {
    throw new Error(`Failed to bulk add parts: ${response.statusText}`);
  }

  return response.json();
}

export async function updatePart(id: string, part: Partial<Part>): Promise<{ success: boolean }> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/parts/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(part),
  });

  if (!response.ok) {
    throw new Error(`Failed to update part: ${response.statusText}`);
  }

  return response.json();
}

export async function deletePart(id: string): Promise<{ success: boolean }> {
  const headers: HeadersInit = {};
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/parts/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete part: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const headers: HeadersInit = {};
  if (!import.meta.env.DEV) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE}/categories`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data = await response.json();
  return data.categories;
}