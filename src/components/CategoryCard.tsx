import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function CategoryCard({ title, description, imageUrl, icon, onClick }: CategoryCardProps) {
  return (
    <Card
      className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          {icon}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-blue-600 group-hover:gap-2 transition-all">
          <span>Browse {title}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
}
