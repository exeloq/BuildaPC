# BuildaPC - PC Building & Shopping Platform

Full-stack web application for browsing PC components, building custom configurations, and purchasing parts through integrated retailer links.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express-like API
- **Database**: MongoDB Atlas
- **Features**: Real-time pricing, purchase links (Amazon/Newegg/Best Buy), component filtering

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
VITE_SUPABASE_URL=your_supabase_url (optional, for production)
VITE_SUPABASE_ANON_KEY=your_supabase_key (optional, for production)
```

### 3. Start Development

**Terminal 1 - Start MongoDB Server:**
```bash
npm run server
```

**Terminal 2 - Start React App:**
```bash
npm run dev
```

### 4. Seed Database
1. Open the app at `http://localhost:5173`
2. Navigate to "Browse Parts"
3. Click "Seed Database Now" button
4. 20 PC parts with purchase links will be added

## Features
- Browse 20+ PC components with specs, ratings, and reviews
- Filter by category, brand, price range, and availability
- Real-time price updates (optional API integration)
- Build custom PC configurations
- Purchase links to Amazon, Newegg, and Best Buy
- Component compatibility validation
- Responsive design with Tailwind CSS

## Project Structure
```
src/
├── components/     # React components
├── services/       # API and pricing services
├── utils/          # API client, seed data, types
└── main.tsx        # App entry point
server.js           # MongoDB API server (port 3002)
```

## Available Scripts
- `npm run dev` - Start React development server
- `npm run server` - Start MongoDB API server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints
The MongoDB server (`http://localhost:3002`) provides:
- `GET /parts` - Get all parts
- `GET /parts/:id` - Get part by ID
- `POST /parts` - Add single part
- `POST /parts/bulk` - Bulk add parts
- `PUT /parts/:id` - Update part
- `DELETE /parts/:id` - Delete part
- `GET /categories` - Get part categories

## Purchase Links
Each part includes optional purchase links:
```typescript
purchaseLinks: {
  amazon?: string;
  newegg?: string;
  bestbuy?: string;
}
```

Links appear on:
- Product cards in Browse Parts
- Selected components in PC Builder
- Build review section
"# BuildaPC" 
"# BuildaPC" 
