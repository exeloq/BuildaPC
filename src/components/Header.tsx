import { Button } from "./ui/button";
import { Menu, User, Clipboard } from "lucide-react";
import logoImage from "figma:asset/5d8d7e4fec81fe3a2c3a8505076ca4858541c7ad.png";
import landingImage from "../assets/landing_image.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <>
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logoImage} alt="PCBuilder Logo" className="w-8 h-8" />
            <span className="text-xl text-gray-900">PCBuilder</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onNavigate("builder")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === "builder"
                  ? "bg-blue-500 !text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Build Your PC
            </button>
            <button
              onClick={() => onNavigate("browse")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === "browse"
                  ? "bg-blue-500 !text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Browse Parts
            </button>
            <button
              onClick={() => onNavigate("prebuilt")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === "prebuilt"
                  ? "bg-blue-500 !text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Pre-Built PCs
            </button>
            <button
              onClick={() => onNavigate("guides")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === "guides"
                  ? "bg-blue-500 !text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Guides
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Clipboard className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>

    {/* Gradient Banner - shown on non-home pages */}
    {currentPage !== "home" && (
      <div className="relative h-12 overflow-hidden">
        <ImageWithFallback
          src={landingImage}
          alt="PC Builder Background"
          className="w-full h-full object-cover"
        />
      </div>
    )}
    </>
  );
}
