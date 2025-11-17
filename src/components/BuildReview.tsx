import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, ShoppingCart, ArrowLeft, Check } from "lucide-react";

interface BuildComponent {
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
}

interface BuildReviewProps {
  build: Record<string, BuildComponent>;
  onBack: () => void;
}

const categoryNames: Record<string, string> = {
  cpu: "Processor (CPU)",
  gpu: "Graphics Card",
  motherboard: "Motherboard",
  ram: "Memory (RAM)",
  storage: "Storage",
  psu: "Power Supply",
  cooling: "Cooling",
  case: "Case",
};

export function BuildReview({ build, onBack }: BuildReviewProps) {
  const components = Object.values(build);
  const totalPrice = components.reduce((sum, component) => sum + component.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16 shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-6 transition-all"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
          <h1 className="text-6xl font-black mb-3 tracking-tight">Review Your Build</h1>
          <p className="text-xl text-blue-100 font-semibold">
            Review your components and purchase from your preferred retailer
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Components List */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-4xl font-black text-gray-900">Selected Components</h2>
                <p className="text-gray-600 mt-1 font-semibold">{components.length} parts in your build</p>
              </div>
            </div>

            {components.length === 0 ? (
              <Card className="p-12 text-center shadow-lg">
                <p className="text-gray-600 mb-4">No components selected yet</p>
                <Button onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go to Builder
                </Button>
              </Card>
            ) : (
              components.map((component) => (
                <Card key={component.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-md bg-white">
                  <div className="flex flex-col md:flex-row gap-0">
                    {/* Image Section */}
                    <div className="md:w-56 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                      <ImageWithFallback
                        src={component.imageUrl}
                        alt={component.name}
                        className="w-full h-52 object-contain"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8">
                      <div className="mb-6">
                        <Badge variant="secondary" className="text-xs mb-3 px-3 py-1 bg-blue-100 text-blue-700 border-0">
                          {categoryNames[component.category] || component.category}
                        </Badge>
                        <p className="text-sm text-gray-500 mb-2 font-bold uppercase tracking-wider">{component.brand}</p>
                        <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{component.name}</h3>
                        {component.specs && component.specs.length > 0 && (
                          <ul className="text-sm text-gray-600 mb-4 space-y-2">
                            {component.specs.slice(0, 2).map((spec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <p className="text-5xl text-blue-600 font-black">
                          ${component.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Purchase Links */}
                      {component.purchaseLinks && (
                        <div className="border-t border-gray-200 pt-6">
                          <p className="text-sm text-gray-700 mb-4 font-bold uppercase tracking-wide">
                            Purchase this part:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {component.purchaseLinks.amazon && (
                              <Button
                                variant="default"
                                size="default"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
                                asChild
                              >
                                <a
                                  href={component.purchaseLinks.amazon}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Amazon
                                </a>
                              </Button>
                            )}
                            {component.purchaseLinks.newegg && (
                              <Button
                                variant="outline"
                                size="default"
                                className="border-2 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all"
                                asChild
                              >
                                <a
                                  href={component.purchaseLinks.newegg}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Newegg
                                </a>
                              </Button>
                            )}
                            {component.purchaseLinks.bestbuy && (
                              <Button
                                variant="outline"
                                size="default"
                                className="border-2 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all"
                                asChild
                              >
                                <a
                                  href={component.purchaseLinks.bestbuy}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Best Buy
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-3xl font-black mb-6 text-gray-900">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {components.map((component) => (
                    <div key={component.id} className="flex justify-between text-sm pb-3 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 truncate mr-3 font-medium">
                        {categoryNames[component.category]}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        ${component.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl text-gray-900 font-black">Total</span>
                    <span className="text-5xl text-blue-600 font-black">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-semibold">
                    Prices may vary by retailer
                  </p>
                </div>

                <Button className="w-full shadow-md hover:shadow-lg transition-all" size="lg" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Modify Build
                </Button>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 rounded-full p-2">
                    <Check className="h-5 w-5 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="text-lg text-emerald-900 mb-2 font-black">
                      Ready to Purchase
                    </h4>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      Your build is complete with all {components.length} components.
                      Click the purchase links to buy from your preferred retailer.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
