import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useState } from "react";
import { Check } from "lucide-react";

interface FeaturedBuildProps {
  title: string;
  price: string;
  specs: string[];
  imageUrl: string;
  tag: string;
  onAddToBuild?: () => void;
}

export function FeaturedBuild({ title, price, specs, imageUrl, tag, onAddToBuild }: FeaturedBuildProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToBuild = () => {
    if (onAddToBuild) {
      onAddToBuild();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 bg-gray-100">
          <ImageWithFallback 
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-4 right-4 bg-blue-600">{tag}</Badge>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl text-gray-900">{title}</h3>
            <span className="text-2xl text-blue-600">{price}</span>
          </div>
          
          <ul className="space-y-2 mb-6">
            {specs.map((spec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {spec}
              </li>
            ))}
          </ul>
          
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => setIsOpen(true)}>View Build</Button>
            <Button variant="outline" className="flex-1">Customize</Button>
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Explore the details of this featured build.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Build Image */}
            <div className="relative h-72 bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-blue-600">{tag}</Badge>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Price</p>
                  <p className="text-4xl text-blue-600">{price}</p>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleAddToBuild}>
                  Add to Build
                </Button>
              </div>
            </div>

            {/* Components List */}
            <div>
              <h3 className="text-xl mb-4 text-gray-900">Included Components</h3>
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="mt-1 p-1 bg-blue-100 rounded-full">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-xl mb-4 text-gray-900">What's Included</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Professional Assembly</p>
                    <p className="text-xs text-gray-500">Built by experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">2-Year Warranty</p>
                    <p className="text-xs text-gray-500">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Cable Management</p>
                    <p className="text-xs text-gray-500">Clean & organized</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Stress Testing</p>
                    <p className="text-xs text-gray-500">Quality assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}