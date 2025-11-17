# Supabase Edge Functions Setup

This project uses Supabase Edge Functions to handle MongoDB operations for the PC parts database.

## Prerequisites

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

## Local Development

1. Make sure you have the `.env` file in the `supabase` folder with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://avnorboev:carrotman33@cluster0.azsklpr.mongodb.net/?appName=Cluster0
   ```

2. Start Supabase local development:
   ```bash
   supabase start
   ```

3. Serve the edge function locally:
   ```bash
   supabase functions serve make-server-9488d537 --env-file supabase/.env
   ```

4. The function will be available at: `http://localhost:54321/functions/v1/make-server-9488d537`

## Deployment

1. Link your project to Supabase:
   ```bash
   supabase link --project-ref hmfupqompfqqbxefrnlk
   ```

2. Set the MongoDB URI secret:
   ```bash
   supabase secrets set MONGODB_URI=mongodb+srv://avnorboev:carrotman33@cluster0.azsklpr.mongodb.net/?appName=Cluster0
   ```

3. Deploy the function:
   ```bash
   supabase functions deploy make-server-9488d537
   ```

## API Endpoints

The function provides the following endpoints:

- `GET /parts` - List all parts (supports `?category=`, `?search=`, `?limit=`, `?skip=`)
- `GET /parts/:id` - Get a single part by ID
- `POST /parts` - Add a new part
- `POST /parts/bulk` - Bulk add parts (for seeding)
- `PUT /parts/:id` - Update a part
- `DELETE /parts/:id` - Delete a part
- `GET /categories` - Get all unique categories

## MongoDB Database Structure

Database: `PCParts`
Collection: `parts`

Each part document should have:
- `id` (number): Unique identifier
- `apiId` (string): Amazon product ID for pricing
- `name` (string): Product name
- `brand` (string): Manufacturer
- `price` (number): Current price
- `originalPrice` (number, optional): Original price
- `rating` (number, optional): Star rating
- `reviews` (number, optional): Number of reviews
- `imageUrl` (string): Product image URL
- `category` (string): Part category (cpu, gpu, ram, etc.)
- `inStock` (boolean): Availability
- `specs` (array of strings, optional): Product specifications
- `description` (string, optional): Product description

## Testing

You can test the function locally by running the seed database function in your React app, or by using curl:

```bash
curl -X POST http://localhost:54321/functions/v1/make-server-9488d537/parts/bulk \
  -H "Content-Type: application/json" \
  -d '{"parts": [{"id": 1, "name": "Test CPU", "brand": "AMD", "price": 299, "category": "cpu", "imageUrl": "https://example.com/img.jpg"}]}'
```
