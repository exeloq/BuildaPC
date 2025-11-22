import { Button } from "./ui/button";
import { ArrowRight, Cpu } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import landingImage from "../assets/landing_image.png";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-30">
        <ImageWithFallback
          src={landingImage}
          alt="Completed Builds"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Cpu className="h-5 w-5 text-blue-300" />
            <span className="text-blue-200 font-medium text-sm tracking-wide uppercase">Custom PC Builder</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white drop-shadow-2xl tracking-tight">
            Build Your Dream PC
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose from thousands of components and build the perfect custom PC for gaming,
            content creation, or professional work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all"
              onClick={() => onNavigate("builder")}
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base font-medium !px-10 !py-3 rounded-full"
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

          <div className="flex flex-wrap gap-12 justify-center pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 drop-shadow-md">2,500+</div>
              <div className="text-gray-300 font-medium text-sm uppercase tracking-wider">Components</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 drop-shadow-md">12,000+</div>
              <div className="text-gray-300 font-medium text-sm uppercase tracking-wider">Builds Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 drop-shadow-md">94%</div>
              <div className="text-gray-300 font-medium text-sm uppercase tracking-wider">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}