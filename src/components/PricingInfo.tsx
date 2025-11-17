import { useState } from "react";
import { Info, TrendingUp, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { clearPriceCache } from "../services/pricingService";
import { toast } from "sonner@2.0.3";

interface PricingInfoProps {
  mode?: "scraping" | "demo";
  pricesLoaded?: number;
}

export function PricingInfo({ mode = "scraping", pricesLoaded = 0 }: PricingInfoProps) {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      const success = await clearPriceCache();
      if (success) {
        toast.success("Price cache cleared successfully!", {
          description: "Reload the page to fetch fresh prices."
        });
      } else {
        toast.error("Failed to clear price cache");
      }
    } catch (error) {
      toast.error("Error clearing cache");
    } finally {
      setIsClearing(false);
    }
  };

  if (mode === "scraping") {
    return (
      <Alert className="mb-6 bg-green-50 border-green-200">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Live Pricing Active</AlertTitle>
        <AlertDescription className="text-green-800">
          Prices are being fetched in real-time from Amazon, Newegg, and Best Buy. 
          {pricesLoaded > 0 && ` Successfully loaded ${pricesLoaded} live prices.`}
          {" "}Prices are cached for 1 hour to improve performance.
          <br />
          <span className="text-xs mt-1 inline-block">
            ⚠️ Web scraping is for personal/educational use only. Respect retailer ToS.
          </span>
          <div className="mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearCache}
              disabled={isClearing}
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              {isClearing ? "Clearing..." : "Clear Price Cache"}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900">Demo Pricing Mode Active</AlertTitle>
      <AlertDescription className="text-blue-800">
        Prices shown are generated with realistic variations (±15%) for demonstration purposes. 
        To enable real pricing from Amazon, Newegg, or Best Buy, set USE_REAL_PRICES=true in your environment.
      </AlertDescription>
    </Alert>
  );
}
