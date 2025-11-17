import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Cpu,
  Monitor,
  MemoryStick,
  Zap,
  HardDrive,
  Fan,
  Box,
  Power,
  Plus,
  Info,
  ExternalLink
} from "lucide-react";

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

interface PCBuilderProps {
  onSelectComponent: (category: string) => void;
  build: Record<string, BuildComponent>;
  onRemoveComponent: (category: string) => void;
  onReviewBuild: () => void;
}

interface ComponentSlot {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  required: boolean;
}

export function PCBuilder({ onSelectComponent, build, onRemoveComponent, onReviewBuild }: PCBuilderProps) {
  const components: ComponentSlot[] = [
    {
      id: "cpu",
      name: "Processor (CPU)",
      icon: <Cpu className="h-8 w-8" />,
      description: "The brain of your computer",
      required: true,
    },
    {
      id: "motherboard",
      name: "Motherboard",
      icon: <Zap className="h-8 w-8" />,
      description: "Connects all components together",
      required: true,
    },
    {
      id: "gpu",
      name: "Graphics Card",
      icon: <Monitor className="h-8 w-8" />,
      description: "Powers your display and gaming",
      required: true,
    },
    {
      id: "ram",
      name: "Memory (RAM)",
      icon: <MemoryStick className="h-8 w-8" />,
      description: "System memory for multitasking",
      required: true,
    },
    {
      id: "storage",
      name: "Storage",
      icon: <HardDrive className="h-8 w-8" />,
      description: "Store your OS, games, and files",
      required: true,
    },
    {
      id: "psu",
      name: "Power Supply",
      icon: <Power className="h-8 w-8" />,
      description: "Provides power to all components",
      required: true,
    },
    {
      id: "cooling",
      name: "Cooling",
      icon: <Fan className="h-8 w-8" />,
      description: "Keep your system cool",
      required: false,
    },
    {
      id: "case",
      name: "Case",
      icon: <Box className="h-8 w-8" />,
      description: "Houses all your components",
      required: false,
    },
  ];

  const totalPrice = Object.values(build).reduce((sum, component) => sum + component.price, 0);
  const requiredComponents = components.filter(c => c.required).length;
  const selectedComponents = Object.keys(build).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Components Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900">Your Build</h2>
                <p className="text-gray-600">
                  {selectedComponents} of {requiredComponents} required components selected
                </p>
              </div>
            </div>

            {components.map((component) => {
              const selectedComponent = build[component.id];
              
              return (
                <Card key={component.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      {component.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl text-gray-900">{component.name}</h3>
                        {component.required && (
                          <Badge variant="secondary" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{component.description}</p>

                      {selectedComponent ? (
                        // Selected component display
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start gap-3 mb-3">
                            <ImageWithFallback
                              src={selectedComponent.imageUrl}
                              alt={selectedComponent.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-500">{selectedComponent.brand}</p>
                              <p className="text-gray-900 line-clamp-2">{selectedComponent.name}</p>
                              <p className="text-green-600 mt-1">${selectedComponent.price}</p>
                            </div>
                          </div>

                          {/* Purchase Links */}
                          {selectedComponent.purchaseLinks && (
                            <div className="mb-3">
                              <div className="text-xs text-gray-600 mb-2">Purchase from:</div>
                              <div className="flex gap-2">
                                {selectedComponent.purchaseLinks.amazon && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs"
                                    asChild
                                  >
                                    <a href={selectedComponent.purchaseLinks.amazon} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Amazon
                                    </a>
                                  </Button>
                                )}
                                {selectedComponent.purchaseLinks.newegg && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs"
                                    asChild
                                  >
                                    <a href={selectedComponent.purchaseLinks.newegg} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Newegg
                                    </a>
                                  </Button>
                                )}
                                {selectedComponent.purchaseLinks.bestbuy && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs"
                                    asChild
                                  >
                                    <a href={selectedComponent.purchaseLinks.bestbuy} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Best Buy
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onSelectComponent(component.id)}
                              className="flex-1"
                            >
                              Change
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveComponent(component.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Empty slot
                        <Button
                          onClick={() => onSelectComponent(component.id)}
                          className="w-full sm:w-auto"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Select {component.name}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Build Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Build Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Components</span>
                    <span className="text-gray-900">{selectedComponents} / {components.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Required Parts</span>
                    <span className="text-gray-900">{selectedComponents} / {requiredComponents}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Estimated Total</span>
                    <span className="text-2xl text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  {totalPrice === 0 && (
                    <p className="text-xs text-gray-500">Add components to see total price</p>
                  )}
                </div>

                <Button
                  className="w-full mb-3"
                  disabled={selectedComponents < requiredComponents}
                  onClick={onReviewBuild}
                >
                  Review Build
                </Button>

                <Button 
                  variant="outline"
                  className="w-full"
                  disabled={selectedComponents === 0}
                >
                  Save Build
                </Button>
              </Card>

              <Card className="p-6 mt-4 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-blue-900 mb-1">Compatibility Check</h4>
                    <p className="text-xs text-blue-700">
                      We'll automatically verify that all your selected components work together.
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
