import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryCard } from "./components/CategoryCard";
import { FeaturedBuild } from "./components/FeaturedBuild";
import { BrowseParts } from "./components/BrowseParts";
import { PCBuilder } from "./components/PCBuilder";
import { BuildReview } from "./components/BuildReview";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { seedDatabase } from "./utils/seedDatabase";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  Monitor,
  Fan,
  CheckCircle,
  Shield,
  Headphones,
  Database,
} from "lucide-react";

function HomePage({
  onNavigate,
  onAddToBuild,
  onSelectCategory,
}: {
  onNavigate: (page: string) => void;
  onAddToBuild: (components: BuildComponent[]) => void;
  onSelectCategory: (category: string) => void;
}) {
  const categories = [
    {
      id: "cpu",
      title: "Processors (CPU)",
      description:
        "High-performance processors from Intel and AMD for every budget",
      imageUrl:
        "https://images.unsplash.com/photo-1588732283387-96e6650e7fae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvciUyMGNwdXxlbnwxfHx8fDE3NjIxNjcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      id: "gpu",
      title: "Graphics Cards",
      description:
        "NVIDIA and AMD GPUs for gaming, rendering, and AI workloads",
      imageUrl:
        "https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBncHV8ZW58MXx8fHwxNzYyMTgwNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Monitor className="h-8 w-8" />,
    },
    {
      id: "ram",
      title: "Memory (RAM)",
      description:
        "DDR4 and DDR5 memory modules for optimal system performance",
      imageUrl:
        "https://images.unsplash.com/photo-1666868213704-1677b7f04c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHJhbSUyMG1lbW9yeXxlbnwxfHx8fDE3NjIxOTE4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <MemoryStick className="h-8 w-8" />,
    },
    {
      id: "motherboard",
      title: "Motherboards",
      description:
        "Quality motherboards with the latest chipsets and features",
      imageUrl:
        "https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdGhlcmJvYXJkfGVufDF8fHx8MTc2MjE3NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      id: "storage",
      title: "Storage",
      description:
        "SSDs and HDDs for fast boot times and massive storage capacity",
      imageUrl:
        "https://images.unsplash.com/photo-1755182528946-1dad8a79f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYyUyMGNhc2UlMjBidWlsZHxlbnwxfHx8fDE3NjIyMDM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <HardDrive className="h-8 w-8" />,
    },
    {
      id: "cooling",
      title: "Cooling",
      description:
        "Air and liquid cooling solutions to keep your system running cool",
      imageUrl:
        "https://images.unsplash.com/photo-1619455052599-4cded9ae462a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBnYW1pbmclMjBwY3xlbnwxfHx8fDE3NjIyMDM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Fan className="h-8 w-8" />,
    },
  ];

  const featuredBuilds = [
    {
      title: "Ultimate Gaming Rig",
      price: "$2,499",
      tag: "Most Popular",
      imageUrl:
        "https://images.unsplash.com/photo-1658673934023-6005e1ff7ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZ2IlMjBnYW1pbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3NjIxMzAwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: [
        "AMD Ryzen 9 7950X",
        "NVIDIA RTX 4080 16GB",
        "32GB DDR5-6000 RAM",
        "2TB Gen4 NVMe SSD",
        "360mm AIO Liquid Cooling",
      ],
      components: [
        {
          id: 1001,
          name: "AMD Ryzen 9 7950X",
          brand: "AMD",
          price: 549,
          imageUrl:
            "https://images.unsplash.com/photo-1588732283387-96e6650e7fae?w=400",
          category: "cpu",
        },
        {
          id: 1002,
          name: "NVIDIA RTX 4080 16GB",
          brand: "NVIDIA",
          price: 1199,
          imageUrl:
            "https://images.unsplash.com/photo-1658673847785-08f1738116f8?w=400",
          category: "gpu",
        },
        {
          id: 1003,
          name: "ASUS ROG Strix B650E-E",
          brand: "ASUS",
          price: 289,
          imageUrl:
            "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
          category: "motherboard",
        },
        {
          id: 1004,
          name: "32GB DDR5-6000 (2x16GB)",
          brand: "Corsair",
          price: 159,
          imageUrl:
            "https://images.unsplash.com/photo-1666868213704-1677b7f04c30?w=400",
          category: "ram",
        },
        {
          id: 1005,
          name: "2TB Gen4 NVMe SSD",
          brand: "Samsung",
          price: 179,
          imageUrl:
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
          category: "storage",
        },
        {
          id: 1006,
          name: "NZXT Kraken 360 AIO",
          brand: "NZXT",
          price: 179,
          imageUrl:
            "https://images.unsplash.com/photo-1619455052599-4cded9ae462a?w=400",
          category: "cooling",
        },
        {
          id: 1007,
          name: "850W 80+ Gold PSU",
          brand: "Corsair",
          price: 129,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "psu",
        },
        {
          id: 1008,
          name: "NZXT H7 Flow RGB",
          brand: "NZXT",
          price: 149,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "case",
        },
      ],
    },
    {
      title: "Content Creator Pro",
      price: "$3,299",
      tag: "Editor's Choice",
      imageUrl:
        "https://images.unsplash.com/photo-1619455052599-4cded9ae462a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBnYW1pbmclMjBwY3xlbnwxfHx8fDE3NjIyMDM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: [
        "Intel Core i9-14900K",
        "NVIDIA RTX 4090 24GB",
        "64GB DDR5-6400 RAM",
        "4TB Gen4 NVMe SSD",
        "Custom Water Cooling Loop",
      ],
      components: [
        {
          id: 2001,
          name: "Intel Core i9-14900K",
          brand: "Intel",
          price: 589,
          imageUrl:
            "https://images.unsplash.com/photo-1588732283387-96e6650e7fae?w=400",
          category: "cpu",
        },
        {
          id: 2002,
          name: "NVIDIA RTX 4090 24GB",
          brand: "NVIDIA",
          price: 1599,
          imageUrl:
            "https://images.unsplash.com/photo-1658673847785-08f1738116f8?w=400",
          category: "gpu",
        },
        {
          id: 2003,
          name: "MSI MEG Z790 ACE",
          brand: "MSI",
          price: 499,
          imageUrl:
            "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
          category: "motherboard",
        },
        {
          id: 2004,
          name: "64GB DDR5-6400 (2x32GB)",
          brand: "G.Skill",
          price: 299,
          imageUrl:
            "https://images.unsplash.com/photo-1666868213704-1677b7f04c30?w=400",
          category: "ram",
        },
        {
          id: 2005,
          name: "4TB Gen4 NVMe SSD",
          brand: "Samsung",
          price: 329,
          imageUrl:
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
          category: "storage",
        },
        {
          id: 2006,
          name: "Custom Water Cooling Kit",
          brand: "EKWB",
          price: 599,
          imageUrl:
            "https://images.unsplash.com/photo-1619455052599-4cded9ae462a?w=400",
          category: "cooling",
        },
        {
          id: 2007,
          name: "1000W 80+ Platinum PSU",
          brand: "Corsair",
          price: 249,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "psu",
        },
        {
          id: 2008,
          name: "Lian Li O11 Dynamic EVO",
          brand: "Lian Li",
          price: 179,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "case",
        },
      ],
    },
    {
      title: "Budget Champion",
      price: "$899",
      tag: "Best Value",
      imageUrl:
        "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MjA5MzAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: [
        "AMD Ryzen 5 7600X",
        "NVIDIA RTX 4060 Ti 8GB",
        "16GB DDR5-5600 RAM",
        "1TB Gen3 NVMe SSD",
        "Tower Air Cooler",
      ],
      components: [
        {
          id: 3001,
          name: "AMD Ryzen 5 7600X",
          brand: "AMD",
          price: 229,
          imageUrl:
            "https://images.unsplash.com/photo-1588732283387-96e6650e7fae?w=400",
          category: "cpu",
        },
        {
          id: 3002,
          name: "NVIDIA RTX 4060 Ti 8GB",
          brand: "NVIDIA",
          price: 399,
          imageUrl:
            "https://images.unsplash.com/photo-1658673847785-08f1738116f8?w=400",
          category: "gpu",
        },
        {
          id: 3003,
          name: "GIGABYTE B650 AORUS Elite",
          brand: "GIGABYTE",
          price: 179,
          imageUrl:
            "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
          category: "motherboard",
        },
        {
          id: 3004,
          name: "16GB DDR5-5600 (2x8GB)",
          brand: "Corsair",
          price: 79,
          imageUrl:
            "https://images.unsplash.com/photo-1666868213704-1677b7f04c30?w=400",
          category: "ram",
        },
        {
          id: 3005,
          name: "1TB Gen3 NVMe SSD",
          brand: "WD",
          price: 69,
          imageUrl:
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
          category: "storage",
        },
        {
          id: 3006,
          name: "Cooler Master Hyper 212",
          brand: "Cooler Master",
          price: 49,
          imageUrl:
            "https://images.unsplash.com/photo-1619455052599-4cded9ae462a?w=400",
          category: "cooling",
        },
        {
          id: 3007,
          name: "650W 80+ Bronze PSU",
          brand: "EVGA",
          price: 79,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "psu",
        },
        {
          id: 3008,
          name: "Fractal Design Focus G",
          brand: "Fractal Design",
          price: 69,
          imageUrl:
            "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
          category: "case",
        },
      ],
    },
  ];

  const features = [
    {
      icon: <CheckCircle className="h-12 w-12 text-blue-600" />,
      title: "Compatibility Check",
      description:
        "Our advanced system ensures all parts work together perfectly",
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Price Guarantee",
      description:
        "Best prices guaranteed or we'll match any competitor",
    },
    {
      icon: <Headphones className="h-12 w-12 text-blue-600" />,
      title: "Expert Support",
      description:
        "24/7 support from PC building experts to help with any questions",
    },
  ];

  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* Categories Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">
              Browse Components
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our extensive catalog of PC parts from top
              manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
                icon={category.icon}
                onClick={() => onSelectCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Builds Section */}
      <section id="featured-builds" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">
              Featured Builds
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expertly curated PC builds for every need and
              budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBuilds.map((build, index) => (
              <FeaturedBuild
                key={index}
                title={build.title}
                price={build.price}
                tag={build.tag}
                imageUrl={build.imageUrl}
                specs={build.specs}
                onAddToBuild={() =>
                  onAddToBuild(build.components)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features & CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Colorful gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500">
          {/* Light beam effect */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-pink-500/30 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Features Glass Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Glass Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-center">
            <p className="text-lg mb-6 text-gray-900 font-medium">
              Start selecting components now and create a custom PC that's perfect for your needs
            </p>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg rounded-full !px-10 !py-3 text-base font-medium"
              onClick={() => onNavigate("builder")}
            >
              Start Building Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg"></div>
              <span className="text-xl text-white font-black">
                PCBuilder
              </span>
            </div>

            <p className="text-sm text-center md:text-left">
              &copy; 2025 PCBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

// Page transition wrapper component
function PageTransition({
  children,
  pageKey,
  direction,
}: {
  children: React.ReactNode;
  pageKey: string;
  direction: number;
}) {
  return (
    <motion.div
      key={pageKey}
      initial={{
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export interface BuildComponent {
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [previousPage, setPreviousPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >(undefined);
  const [build, setBuild] = useState<
    Record<string, BuildComponent>
  >({});

  // Load build from localStorage on mount
  useEffect(() => {
    try {
      const savedBuild = localStorage.getItem(
        "pcbuilder_build",
      );
      if (savedBuild) {
        setBuild(JSON.parse(savedBuild));
      }
    } catch (error) {
      console.error(
        "Error loading build from localStorage:",
        error,
      );
    }
  }, []);

  // Save build to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "pcbuilder_build",
        JSON.stringify(build),
      );
    } catch (error) {
      console.error(
        "Error saving build to localStorage:",
        error,
      );
    }
  }, [build]);

  // Navigation order based on header (from left to right)
  const pageOrder: Record<string, number> = {
    home: 0,
    builder: 1,
    browse: 2,
    review: 2.5,
    prebuilt: 3,
    guides: 4,
  };

  // Calculate animation direction based on page order
  const getDirection = () => {
    const currentIndex = pageOrder[currentPage] || 0;
    const previousIndex = pageOrder[previousPage] || 0;
    return currentIndex > previousIndex ? 1 : -1;
  };

  const handleSelectComponent = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage("browse");
  };

  const handleAddToBuild = (component: BuildComponent) => {
    const categoryNames: Record<string, string> = {
      cpu: "CPU",
      gpu: "Graphics Card",
      motherboard: "Motherboard",
      ram: "RAM",
      storage: "Storage",
      psu: "Power Supply",
      cooling: "Cooling",
      case: "Case",
    };

    setBuild((prev) => ({
      ...prev,
      [component.category]: component,
    }));

    toast.success(`Added ${component.name} to your build!`, {
      description: `${categoryNames[component.category] || component.category} - $${component.price}`,
    });

    setCurrentPage("builder");
  };

  const handleAddPrebuiltToBuild = (
    components: BuildComponent[],
  ) => {
    const newBuild: Record<string, BuildComponent> = {};
    components.forEach((component) => {
      newBuild[component.category] = component;
    });

    setBuild(newBuild);

    toast.success(`Complete build added!`, {
      description: `${components.length} components added to your build list`,
    });

    setPreviousPage(currentPage);
    setCurrentPage("builder");
  };

  const handleRemoveFromBuild = (category: string) => {
    setBuild((prev) => {
      const newBuild = { ...prev };
      delete newBuild[category];
      return newBuild;
    });
  };

  const handleNavigate = (page: string) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    // Clear category filter when navigating away from browse, except when coming from builder
    if (page !== "browse" && page !== "builder") {
      setSelectedCategory(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <PageTransition
            pageKey="home"
            direction={getDirection()}
          >
            <HomePage
              onNavigate={handleNavigate}
              onAddToBuild={handleAddPrebuiltToBuild}
              onSelectCategory={handleSelectComponent}
            />
          </PageTransition>
        )}
        {currentPage === "browse" && (
          <PageTransition
            pageKey="browse"
            direction={getDirection()}
          >
            <BrowseParts
              initialCategory={selectedCategory}
              onAddToBuild={handleAddToBuild}
            />
          </PageTransition>
        )}
        {currentPage === "builder" && (
          <PageTransition
            pageKey="builder"
            direction={getDirection()}
          >
            <PCBuilder
              onSelectComponent={handleSelectComponent}
              build={build}
              onRemoveComponent={handleRemoveFromBuild}
              onReviewBuild={() => handleNavigate("review")}
            />
          </PageTransition>
        )}
        {currentPage === "review" && (
          <PageTransition
            pageKey="review"
            direction={getDirection()}
          >
            <BuildReview
              build={build}
              onBack={() => handleNavigate("builder")}
            />
          </PageTransition>
        )}
        {currentPage === "prebuilt" && (
          <PageTransition
            pageKey="prebuilt"
            direction={getDirection()}
          >
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-4xl mb-4 text-gray-900">
                Pre-Built PCs
              </h1>
              <p className="text-xl text-gray-600">
                Coming soon...
              </p>
            </div>
          </PageTransition>
        )}
        {currentPage === "guides" && (
          <PageTransition
            pageKey="guides"
            direction={getDirection()}
          >
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-4xl mb-4 text-gray-900">
                Build Guides
              </h1>
              <p className="text-xl text-gray-600">
                Coming soon...
              </p>
            </div>
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}