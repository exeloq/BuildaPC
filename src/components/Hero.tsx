import { Button } from "./ui/button";
import { ArrowRight, Cpu } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import landingImage from "../assets/landing_image.png";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ImageWithFallback
          src={landingImage}
          alt="Completed Builds"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="h-6 w-6 text-blue-400" />
            <span className="text-blue-400 font-bold">Custom PC Builder</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-lg">
            Build Your Dream PC
          </h1>

          <p className="text-xl text-gray-100 mb-8 max-w-2xl font-semibold drop-shadow-md">
            Choose from thousands of components and build the perfect custom PC for gaming,
            content creation, or professional work. Get expert recommendations and compatibility checks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white text-white hover:bg-white/20"
              onClick={() => {
                const element = document.getElementById('featured-builds');
                if (element) {
                  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
                  const startPosition = window.pageYOffset;
                  const distance = targetPosition - startPosition;
                  const duration = 1000;
                  let start: number | null = null;
                  
                  const animation = (currentTime: number) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function for smooth animation (easeInOutCubic)
                    const ease = progress < 0.5
                      ? 4 * progress * progress * progress
                      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                      requestAnimationFrame(animation);
                    }
                  };
                  
                  requestAnimationFrame(animation);
                }
              }}
            >
              Browse Pre-Built PCs
            </Button>
          </div>
          
          <div className="flex gap-8 mt-12 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl font-black mb-1 drop-shadow-md">2,500+</div>
              <div className="text-gray-200 font-semibold">Components</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1 drop-shadow-md">12,000+</div>
              <div className="text-gray-200 font-semibold">Builds Created</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1 drop-shadow-md">94%</div>
              <div className="text-gray-200 font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}