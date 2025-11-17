import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { PricingInfo } from "./PricingInfo";
import { fetchProductPrices } from "../services/pricingService";
import { fetchParts, type Part } from "../utils/api";
import { SeedButton } from "./SeedButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Search, SlidersHorizontal, X, LayoutGrid, List, Loader2 } from "lucide-react";

const categories = [
  { id: "cpu", name: "Processors (CPU)", count: 0 },
  { id: "gpu", name: "Graphics Cards", count: 0 },
  { id: "motherboard", name: "Motherboards", count: 0 },
  { id: "ram", name: "Memory (RAM)", count: 0 },
  { id: "storage", name: "Storage", count: 0 },
  { id: "cooling", name: "Cooling", count: 0 },
  { id: "psu", name: "Power Supplies", count: 0 },
  { id: "case", name: "Cases", count: 0 },
];

const brands = [
  "AMD", "Intel", "NVIDIA", "ASUS", "MSI", "Gigabyte", 
  "Corsair", "G.Skill", "Samsung", "Western Digital", "Seagate"
];

interface BrowsePartsProps {
  initialCategory?: string;
  onAddToBuild?: (component: {
    id: number;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    category: string;
    specs?: string[];
    purchaseLinks?: {
      amazon?: string;
      newegg?: string;
      bestbuy?: string;
    };
  }) => void;
}

export function BrowseParts({ initialCategory, onAddToBuild }: BrowsePartsProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [realPrices, setRealPrices] = useState<Record<string, number>>({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [products, setProducts] = useState<Part[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch products from MongoDB
  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      setDbError(null);
      try {
        const result = await fetchParts({ 
          limit: 1000 // Get all products for now
        });
        setProducts(result.parts);
        setTotalProducts(result.total);
        console.log(`📦 Loaded ${result.parts.length} products from database`);
        
        // If no products found, show helpful message
        if (result.parts.length === 0) {
          console.warn("⚠️ No products found in database. Please seed the database first.");
        }
        
        // Load real prices for products that have apiId
        const productsWithApiId = result.parts.filter(p => p.apiId);
        if (productsWithApiId.length > 0) {
          loadRealPrices(productsWithApiId);
        }
      } catch (error) {
        console.error("❌ Failed to load products:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        // Check if it's a MongoDB connection error
        if (errorMessage.includes("MONGODB_URI") || errorMessage.includes("connection")) {
          setDbError("Database connection failed. Please check your server configuration.");
        } else {
          setDbError(errorMessage);
        }
        
        // Show user-friendly error
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Fetch real prices for products
  const loadRealPrices = async (productsToPrice: Part[]) => {
    setLoadingPrices(true);
    try {
      const apiIds = productsToPrice
        .map(p => p.apiId)
        .filter((id): id is string => id !== undefined);
      
      if (apiIds.length === 0) return;

      console.log(`🔄 Loading prices for ${apiIds.length} products...`);
      const prices = await fetchProductPrices(apiIds);
      setRealPrices(prices);
      
      const count = Object.keys(prices).length;
      if (count > 0) {
        console.log(`✅ Successfully loaded ${count} prices`);
        const samplePrice = Object.entries(prices)[0];
        console.log(`📊 Sample: ${samplePrice[0]} = $${samplePrice[1]}`);
      } else {
        console.log(`💾 Using fallback prices (demo mode or cache miss)`);
      }
    } catch (error) {
      console.error("❌ Failed to load real prices:", error);
    } finally {
      setLoadingPrices(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSearchQuery("");
  };

  // Helper function to get the current price (real or fallback)
  const getCurrentPrice = (product: Part) => {
    if (product.apiId && realPrices[product.apiId]) {
      return realPrices[product.apiId];
    }
    return product.price;
  };

  const filteredProducts = products.filter(product => {
    const currentPrice = getCurrentPrice(product);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = currentPrice >= priceRange[0] && currentPrice <= priceRange[1];
    const matchesStock = !inStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getCurrentPrice(a) - getCurrentPrice(b);
      case "price-high":
        return getCurrentPrice(b) - getCurrentPrice(a);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "reviews":
        return (b.reviews || 0) - (a.reviews || 0);
      default:
        return 0;
    }
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-gray-900">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer text-gray-700"
                >
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-gray-500">
                {products.filter(p => p.category === category.id).length}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-gray-900">Brands</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer text-gray-700"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-gray-900">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={2000}
            step={50}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <label htmlFor="in-stock" className="text-sm cursor-pointer text-gray-700">
          In Stock Only
        </label>
      </div>
    </div>
  );

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (inStockOnly ? 1 : 0);

  if (loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products from database...</p>
        </div>
      </div>
    );
  }

  // Show error state if database connection failed
  if (dbError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <h2 className="text-xl mb-2 text-red-900">❌ Database Connection Error</h2>
            <p className="text-red-700 mb-4">{dbError}</p>
            <div className="bg-white rounded-lg p-4 text-left">
              <h3 className="text-sm mb-2 text-gray-900">🔧 How to fix this:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Make sure you have a MongoDB Atlas account</li>
                <li>Get your connection string from MongoDB Atlas</li>
                <li>Add it as the MONGODB_URI environment variable</li>
                <li>Whitelist your IP address in MongoDB Atlas Network Access</li>
              </ol>
            </div>
          </div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Browse Parts</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Pricing Info Alert */}
            <PricingInfo 
              mode={Object.keys(realPrices).length > 0 ? "scraping" : "demo"}
              pricesLoaded={Object.keys(realPrices).length}
            />
            
            {/* Search and Controls */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 bg-blue-600">{activeFiltersCount}</Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Refine your search results
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                        {activeFiltersCount > 0 && (
                          <Button
                            variant="outline"
                            className="w-full mt-6"
                            onClick={clearFilters}
                          >
                            Clear All Filters
                          </Button>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden md:flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedCategories.map(catId => {
                    const category = categories.find(c => c.id === catId);
                    return (
                      <Badge key={catId} variant="secondary" className="gap-1">
                        {category?.name}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleCategoryToggle(catId)}
                        />
                      </Badge>
                    );
                  })}
                  {selectedBrands.map(brand => (
                    <Badge key={brand} variant="secondary" className="gap-1">
                      {brand}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleBrandToggle(brand)}
                      />
                    </Badge>
                  ))}
                  {inStockOnly && (
                    <Badge variant="secondary" className="gap-1">
                      In Stock Only
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setInStockOnly(false)}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
              <span className="text-gray-600">
                Showing {sortedProducts.length} of {totalProducts} products
              </span>
              {loadingPrices ? (
                <Badge variant="secondary" className="animate-pulse">
                  ⏳ Loading prices...
                </Badge>
              ) : Object.keys(realPrices).length > 0 ? (
                <Badge className="bg-green-600">
                  ✓ Live Prices Updated
                </Badge>
              ) : (
                <Badge variant="secondary">
                  💾 Using Default Prices
                </Badge>
              )}
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {sortedProducts.map(product => {
                  const currentPrice = getCurrentPrice(product);
                  return (
                    <ProductCard
                      key={product._id || product.id}
                      name={product.name}
                      brand={product.brand}
                      price={currentPrice}
                      originalPrice={product.originalPrice}
                      rating={product.rating}
                      reviews={product.reviews}
                      imageUrl={product.imageUrl}
                      inStock={product.inStock}
                      specs={product.specs}
                      purchaseLinks={product.purchaseLinks}
                      onAddToBuild={onAddToBuild ? () => onAddToBuild({
                        id: product.id || 0,
                        name: product.name,
                        brand: product.brand,
                        price: currentPrice,
                        imageUrl: product.imageUrl,
                        category: product.category,
                        specs: product.specs,
                        purchaseLinks: product.purchaseLinks
                      }) : undefined}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">
                  {totalProducts === 0 ? "Database is empty" : "No products found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {totalProducts === 0 
                    ? "Click the button below to seed the database with sample PC parts"
                    : "Try adjusting your filters or search query"
                  }
                </p>
                {totalProducts === 0 ? (
                  <div className="space-y-4">
                    <SeedButton onSuccess={() => window.location.reload()} />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto text-left">
                      <h4 className="text-sm mb-2 text-blue-900">💡 What happens when you click?</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>12 sample PC parts will be added to the database</li>
                        <li>Includes CPUs, GPUs, RAM, Motherboards, and more</li>
                        <li>Real-time pricing integration with Amazon</li>
                        <li>The page will automatically reload when done</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}