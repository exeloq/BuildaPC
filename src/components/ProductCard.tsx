import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, ClipboardPlus, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  inStock: boolean;
  specs?: string[];
  purchaseLinks?: {
    amazon?: string;
    newegg?: string;
    bestbuy?: string;
  };
  onAddToBuild?: () => void;
}

export function ProductCard({
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviews,
  imageUrl,
  inStock,
  specs,
  purchaseLinks,
  onAddToBuild
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <ImageWithFallback 
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-600">
            {discount}% OFF
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white px-4 py-2 bg-red-600 rounded">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{brand}</div>
        <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>
        
        {specs && specs.length > 0 && (
          <ul className="text-xs text-gray-600 mb-3 space-y-1">
            {specs.slice(0, 2).map((spec, index) => (
              <li key={index} className="truncate">• {spec}</li>
            ))}
          </ul>
        )}
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
          <span className="text-sm text-gray-500">({reviews})</span>
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-2xl text-blue-600">
            ${Number.isInteger(price) ? price : price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through mb-1">
              ${Number.isInteger(originalPrice) ? originalPrice : originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <Button
          className="w-full mb-3"
          disabled={!inStock}
          onClick={onAddToBuild}
        >
          <ClipboardPlus className="h-4 w-4 mr-2" />
          {inStock ? 'Add to Build' : 'Out of Stock'}
        </Button>

        {/* Purchase Links */}
        {purchaseLinks && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 mb-2">Buy from:</div>
            <div className="flex gap-2">
              {purchaseLinks.amazon && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  asChild
                >
                  <a href={purchaseLinks.amazon} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Amazon
                  </a>
                </Button>
              )}
              {purchaseLinks.newegg && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  asChild
                >
                  <a href={purchaseLinks.newegg} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Newegg
                  </a>
                </Button>
              )}
              {purchaseLinks.bestbuy && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  asChild
                >
                  <a href={purchaseLinks.bestbuy} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Best Buy
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
