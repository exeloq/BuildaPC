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
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate("builder")}
              className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="relative">
                Build Your PC
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            <button 
              onClick={() => onNavigate("browse")}
              className={`relative transition-all duration-300 hover:-translate-y-0.5 group ${
                currentPage === "browse" 
                  ? "text-blue-600" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="relative">
                Browse Parts
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            <button 
              onClick={() => onNavigate("prebuilt")}
              className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="relative">
                Pre-Built PCs
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            <button 
              onClick={() => onNavigate("guides")}
              className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="relative">
                Guides
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
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
