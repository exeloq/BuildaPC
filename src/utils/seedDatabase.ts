/**
 * Database Seeding Script
 * 
 * This file contains a function to populate your MongoDB database with initial PC parts data.
 * 
 * IMPORTANT: You need to call this function ONCE to populate your database.
 * You can either:
 * 1. Create a temporary button in your UI that calls `seedDatabase()` when clicked
 * 2. Call it from the browser console: `window.seedDatabase()`
 * 
 * After running once successfully, you can remove or comment out the call.
 */

import { bulkAddParts, type Part } from './api';

export const initialParts: Omit<Part, '_id'>[] = [
  // CPUs
  {
    id: 1,
    apiId: "B0BBHD8Q8G",
    name: "AMD Ryzen 9 7950X 16-Core, 32-Thread Unlocked Desktop Processor",
    brand: "AMD",
    price: 497,
    originalPrice: 699,
    rating: 4.6,
    reviews: 2341,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores / 32 Threads", "5.7 GHz Max Boost"],
    description: "High-performance processor for gaming and content creation with exceptional multi-threaded performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+7950X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+7950X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+9+7950X"
    }
  },
  {
    id: 2,
    apiId: "B0BM5XFHN3",
    name: "ASUS TUF Gaming GeForce RTX 4080 16GB GDDR6X Graphics Card",
    brand: "NVIDIA",
    price: 1199,
    rating: 4.9,
    reviews: 1876,
    imageUrl: "https://m.media-amazon.com/images/I/81bholdTKVL._AC_SL1500_.jpg",
    category: "gpu",
    inStock: true,
    specs: ["16GB GDDR6X", "DLSS 3.0 Support"],
    description: "Powerful graphics card for 4K gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=ASUS+TUF+Gaming+GeForce+RTX+4080",
      newegg: "https://www.newegg.com/p/pl?d=ASUS+TUF+Gaming+GeForce+RTX+4080"
    }
  },
  {
    id: 3,
    apiId: "B0BQRYWXX3",
    name: "Corsair Vengeance DDR5 RAM 32GB (2x16GB) 6000MHz",
    brand: "Corsair",
    price: 139,
    originalPrice: 179,
    rating: 4.7,
    reviews: 3421,
    imageUrl: "https://m.media-amazon.com/images/I/51aeL+F6TZL._AC_SL1280_.jpg",
    category: "ram",
    inStock: true,
    specs: ["DDR5-6000MHz", "32GB (2x16GB)"],
    description: "High-speed DDR5 memory for demanding applications",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Corsair+Vengeance+DDR5+32GB+6000MHz",
      newegg: "https://www.newegg.com/p/pl?d=Corsair+Vengeance+DDR5+32GB",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Corsair+Vengeance+DDR5+32GB"
    }
  },
  {
    id: 4,
    apiId: "B0BG6M53DG",
    name: "ASUS ROG STRIX Z790-E Gaming WiFi 6E LGA 1700 ATX Motherboard",
    brand: "ASUS",
    price: 449,
    rating: 4.6,
    reviews: 892,
    imageUrl: "https://m.media-amazon.com/images/I/91SIEbKKtKL._AC_SL1500_.jpg",
    category: "motherboard",
    inStock: true,
    specs: ["LGA 1700 Socket", "DDR5 Support"],
    description: "Premium gaming motherboard with WiFi 6E",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=ASUS+ROG+STRIX+Z790-E+Gaming",
      newegg: "https://www.newegg.com/p/pl?d=ASUS+ROG+STRIX+Z790-E+Gaming"
    }
  },
  {
    id: 5,
    apiId: "B0BHJJ9Y77",
    name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 Internal SSD",
    brand: "Samsung",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviews: 4521,
    imageUrl: "https://m.media-amazon.com/images/I/71VLN61JT2L._AC_SL1500_.jpg",
    category: "storage",
    inStock: true,
    specs: ["2TB Capacity", "7,450 MB/s Read"],
    description: "Ultra-fast NVMe SSD for blazing load times",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Samsung+990+PRO+2TB",
      newegg: "https://www.newegg.com/p/pl?d=Samsung+990+PRO+2TB",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Samsung+990+PRO+2TB"
    }
  },
  {
    id: 6,
    apiId: "B09M3Z7N9K",
    name: "Corsair iCUE H150i ELITE CAPELLIX 360mm RGB Liquid CPU Cooler",
    brand: "Corsair",
    price: 189,
    rating: 4.8,
    reviews: 1245,
    imageUrl: "https://m.media-amazon.com/images/I/71u9N26iO7L._AC_SL1500_.jpg",
    category: "cooling",
    inStock: false,
    specs: ["360mm Radiator", "RGB Lighting"],
    description: "Premium AIO liquid cooler with RGB",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Corsair+iCUE+H150i+ELITE+CAPELLIX",
      newegg: "https://www.newegg.com/p/pl?d=Corsair+iCUE+H150i+ELITE+CAPELLIX"
    }
  },
  {
    id: 7,
    apiId: "B079H6111J",
    name: "Corsair RM850x 850W 80 PLUS Gold Fully Modular ATX Power Supply",
    brand: "Corsair",
    price: 134,
    rating: 4.7,
    reviews: 2987,
    imageUrl: "https://m.media-amazon.com/images/I/61TcWGEHb2L._AC_SL1280_.jpg",
    category: "psu",
    inStock: true,
    specs: ["850W Output", "80 PLUS Gold"],
    description: "Efficient and reliable power supply unit",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Corsair+RM850x+850W",
      newegg: "https://www.newegg.com/p/pl?d=Corsair+RM850x+850W",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Corsair+RM850x"
    }
  },
  {
    id: 8,
    apiId: "B0CHBJMNJ9",
    name: "Intel Core i7-14700K 20-Core Desktop Processor",
    brand: "Intel",
    price: 409,
    originalPrice: 449,
    rating: 4.7,
    reviews: 1567,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["20 Cores", "5.6 GHz Turbo"],
    description: "Intel's high-performance gaming processor",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-14700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-14700K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i7-14700K"
    }
  },
  {
    id: 9,
    apiId: "B0BPWKL1RC",
    name: "ASUS TUF Gaming GeForce RTX 4070 Ti 12GB Graphics Card",
    brand: "ASUS",
    price: 799,
    rating: 4.8,
    reviews: 923,
    imageUrl: "https://m.media-amazon.com/images/I/81UGmUEGVjL._AC_SL1500_.jpg",
    category: "gpu",
    inStock: true,
    specs: ["12GB GDDR6X", "Ray Tracing"],
    description: "Mid-range RTX graphics card for 1440p gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=ASUS+TUF+GeForce+RTX+4070+Ti",
      newegg: "https://www.newegg.com/p/pl?d=ASUS+TUF+GeForce+RTX+4070+Ti"
    }
  },
  {
    id: 10,
    apiId: "B0BMT4C77Z",
    name: "G.Skill Trident Z5 RGB DDR5 64GB (2x32GB) 6400MHz",
    brand: "G.Skill",
    price: 279,
    rating: 4.9,
    reviews: 567,
    imageUrl: "https://m.media-amazon.com/images/I/61K8R7RyNBL._AC_SL1200_.jpg",
    category: "ram",
    inStock: true,
    specs: ["DDR5-6400MHz", "64GB (2x32GB)"],
    description: "Premium DDR5 RAM with RGB lighting",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=G.Skill+Trident+Z5+RGB+DDR5+64GB",
      newegg: "https://www.newegg.com/p/pl?d=G.Skill+Trident+Z5+RGB+DDR5+64GB"
    }
  },
  {
    id: 11,
    apiId: "B0BHR7SZ6Q",
    name: "MSI MAG B650 TOMAHAWK WiFi Gaming Motherboard",
    brand: "MSI",
    price: 219,
    rating: 4.6,
    reviews: 1234,
    imageUrl: "https://m.media-amazon.com/images/I/81JqhzQrqjL._AC_SL1500_.jpg",
    category: "motherboard",
    inStock: true,
    specs: ["AM5 Socket", "WiFi 6E"],
    description: "AMD B650 motherboard for Ryzen 7000 series",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=MSI+MAG+B650+TOMAHAWK+WiFi",
      newegg: "https://www.newegg.com/p/pl?d=MSI+MAG+B650+TOMAHAWK+WiFi"
    }
  },
  {
    id: 12,
    apiId: "B0B7CPSN2K",
    name: "Western Digital Black SN850X 4TB NVMe SSD",
    brand: "Western Digital",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 2134,
    imageUrl: "https://m.media-amazon.com/images/I/51LKMFBF0VL._AC_SL1500_.jpg",
    category: "storage",
    inStock: true,
    specs: ["4TB Capacity", "7,300 MB/s Read"],
    description: "High-capacity NVMe SSD for gaming and storage",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=WD+Black+SN850X+4TB",
      newegg: "https://www.newegg.com/p/pl?d=WD+Black+SN850X+4TB",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=WD+Black+SN850X+4TB"
    }
  },
  // Additional CPUs
  {
    id: 13,
    apiId: "B0C7CG89YH",
    name: "AMD Ryzen 7 7800X3D 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 449,
    originalPrice: 449,
    rating: 4.9,
    reviews: 3892,
    imageUrl: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "5.0 GHz Max Boost", "96MB 3D V-Cache"],
    description: "Best gaming CPU with 3D V-Cache technology for unmatched gaming performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7800X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7800X3D",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+7800X3D"
    }
  },
  {
    id: 14,
    apiId: "B0CGJJNJ7G",
    name: "Intel Core i5-14600K 14-Core Desktop Processor",
    brand: "Intel",
    price: 319,
    originalPrice: 329,
    rating: 4.7,
    reviews: 1456,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["14 Cores (6P+8E)", "5.3 GHz Turbo"],
    description: "Excellent mid-range gaming and productivity processor with hybrid architecture",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-14600K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-14600K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i5-14600K"
    }
  },
  // Additional GPUs
  {
    id: 15,
    apiId: "B0CG16Z6Y7",
    name: "NVIDIA GeForce RTX 4090 24GB GDDR6X Founders Edition",
    brand: "NVIDIA",
    price: 1599,
    rating: 4.9,
    reviews: 2456,
    imageUrl: "https://m.media-amazon.com/images/I/81e8yk74LOL._AC_SL1500_.jpg",
    category: "gpu",
    inStock: true,
    specs: ["24GB GDDR6X", "DLSS 3.5", "16384 CUDA Cores"],
    description: "Ultimate graphics card for 4K gaming and professional workloads",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=NVIDIA+GeForce+RTX+4090",
      newegg: "https://www.newegg.com/p/pl?d=NVIDIA+GeForce+RTX+4090",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=NVIDIA+GeForce+RTX+4090"
    }
  },
  {
    id: 16,
    apiId: "B0BHQD1V4Y",
    name: "AMD Radeon RX 7900 XTX 24GB GDDR6 Graphics Card",
    brand: "AMD",
    price: 899,
    originalPrice: 999,
    rating: 4.7,
    reviews: 1234,
    imageUrl: "https://m.media-amazon.com/images/I/71MIzW4REHL._AC_SL1500_.jpg",
    category: "gpu",
    inStock: true,
    specs: ["24GB GDDR6", "FSR 3.0", "6144 Stream Processors"],
    description: "High-performance AMD graphics card for enthusiast gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Radeon+RX+7900+XTX",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Radeon+RX+7900+XTX"
    }
  },
  // Additional RAM
  {
    id: 17,
    apiId: "B0BMRDP33M",
    name: "Corsair Dominator Platinum RGB DDR5 32GB (2x16GB) 6600MHz",
    brand: "Corsair",
    price: 179,
    originalPrice: 219,
    rating: 4.8,
    reviews: 876,
    imageUrl: "https://m.media-amazon.com/images/I/61UitVJwsqL._AC_SL1280_.jpg",
    category: "ram",
    inStock: true,
    specs: ["DDR5-6600MHz", "32GB (2x16GB)", "RGB Lighting"],
    description: "Premium DDR5 memory with stunning RGB lighting and exceptional overclocking",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Corsair+Dominator+Platinum+RGB+DDR5+32GB",
      newegg: "https://www.newegg.com/p/pl?d=Corsair+Dominator+Platinum+RGB+DDR5+32GB"
    }
  },
  // Additional Storage
  {
    id: 18,
    apiId: "B0CHQR3FN5",
    name: "Crucial P5 Plus 1TB PCIe 4.0 NVMe M.2 SSD",
    brand: "Crucial",
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    reviews: 3421,
    imageUrl: "https://m.media-amazon.com/images/I/71UtOp8BPRL._AC_SL1500_.jpg",
    category: "storage",
    inStock: true,
    specs: ["1TB Capacity", "6,600 MB/s Read", "PCIe Gen 4"],
    description: "Affordable high-speed NVMe SSD perfect for OS and gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Crucial+P5+Plus+1TB",
      newegg: "https://www.newegg.com/p/pl?d=Crucial+P5+Plus+1TB",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Crucial+P5+Plus+1TB"
    }
  },
  // Additional Cooling
  {
    id: 19,
    apiId: "B0BQW9R82P",
    name: "Noctua NH-D15 chromax.black Premium CPU Cooler",
    brand: "Noctua",
    price: 119,
    rating: 4.9,
    reviews: 5421,
    imageUrl: "https://m.media-amazon.com/images/I/81LYFE+gUSL._AC_SL1500_.jpg",
    category: "cooling",
    inStock: true,
    specs: ["Dual Tower Design", "2x 140mm Fans", "Ultra Quiet"],
    description: "Industry-leading air cooler with exceptional performance and silence",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Noctua+NH-D15+chromax.black",
      newegg: "https://www.newegg.com/p/pl?d=Noctua+NH-D15+chromax.black"
    }
  },
  // Additional Case
  {
    id: 20,
    apiId: "B08C74694Z",
    name: "NZXT H7 Flow RGB Mid-Tower ATX Gaming Case",
    brand: "NZXT",
    price: 149,
    originalPrice: 169,
    rating: 4.8,
    reviews: 2134,
    imageUrl: "https://m.media-amazon.com/images/I/71h8NiBhMDL._AC_SL1500_.jpg",
    category: "case",
    inStock: true,
    specs: ["Mid-Tower ATX", "Tempered Glass", "3x RGB Fans Included"],
    description: "Modern gaming case with excellent airflow and premium build quality",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=NZXT+H7+Flow+RGB",
      newegg: "https://www.newegg.com/p/pl?d=NZXT+H7+Flow+RGB",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=NZXT+H7+Flow"
    }
  },
  // Additional AMD CPUs
  {
    id: 21,
    apiId: "B0D1F2KQXY",
    name: "AMD Ryzen 7 9800X3D 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 467.15,
    rating: 4.7,
    reviews: 300,
    imageUrl: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.7 GHz Base", "5.2 GHz Boost", "Zen 5"],
    description: "Latest generation gaming CPU with 3D V-Cache technology for ultimate gaming performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+9800X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+9800X3D",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+9800X3D"
    }
  },
  {
    id: 22,
    apiId: "B0C7CG89YH",
    name: "AMD Ryzen 7 7800X3D 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 398.00,
    rating: 4.8,
    reviews: 569,
    imageUrl: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.2 GHz Base", "5.0 GHz Boost", "Zen 4"],
    description: "Best gaming CPU with 3D V-Cache technology for unmatched gaming performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7800X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7800X3D",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+7800X3D"
    }
  },
  {
    id: 23,
    apiId: "B0CHJD5J6N",
    name: "AMD Ryzen 5 7600X 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 179.96,
    rating: 4.7,
    reviews: 315,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "4.7 GHz Base", "5.3 GHz Boost", "Zen 4"],
    description: "Excellent mid-range gaming processor with great single-thread performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+7600X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+7600X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+7600X"
    }
  },
  {
    id: 24,
    apiId: "B0CHJG9X7V",
    name: "AMD Ryzen 5 9600X 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 188.94,
    rating: 4.6,
    reviews: 78,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.9 GHz Base", "5.4 GHz Boost", "Zen 5"],
    description: "Latest generation Ryzen 5 processor with improved efficiency and performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+9600X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+9600X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+9600X"
    }
  },
  {
    id: 25,
    apiId: "B0D1HTYQX9",
    name: "AMD Ryzen 9 9950X3D 16-Core, 32-Thread Desktop Processor",
    brand: "AMD",
    price: 679.99,
    rating: 4.5,
    reviews: 30,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores / 32 Threads", "4.3 GHz Base", "5.7 GHz Boost", "Zen 5"],
    description: "Flagship gaming and productivity CPU with 3D V-Cache for ultimate performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+9950X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+9950X3D",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+9+9950X3D"
    }
  },
  {
    id: 26,
    apiId: "B0CHJG8KQV",
    name: "AMD Ryzen 7 9700X 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 294.01,
    rating: 4.6,
    reviews: 88,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.8 GHz Base", "5.5 GHz Boost", "Zen 5"],
    description: "Balanced Ryzen 7 processor for gaming and content creation with low power consumption",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+9700X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+9700X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+9700X"
    }
  },
  {
    id: 27,
    apiId: "B0D5500XNH",
    name: "AMD Ryzen 5 5500 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 75.95,
    rating: 4.6,
    reviews: 82,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.6 GHz Base", "4.2 GHz Boost", "Zen 3"],
    description: "Budget-friendly Ryzen 5 processor perfect for entry-level gaming builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5500",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5500",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+5500"
    }
  },
  {
    id: 28,
    apiId: "B0CHJG7K7M",
    name: "AMD Ryzen 7 7700X 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 254.99,
    rating: 4.7,
    reviews: 207,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.5 GHz Base", "5.4 GHz Boost", "Zen 4"],
    description: "High-performance Ryzen 7 for gaming and productivity with excellent value",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7700X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7700X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+7700X"
    }
  },
  {
    id: 29,
    apiId: "B0D5501KNH",
    name: "AMD Ryzen 5 5600 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 135.50,
    rating: 4.8,
    reviews: 184,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.5 GHz Base", "4.4 GHz Boost", "Zen 3"],
    description: "Popular mid-range processor offering excellent gaming performance at great value",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5600",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5600",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+5600"
    }
  },
  {
    id: 30,
    apiId: "B0D5502MHN",
    name: "AMD Ryzen 5 3600 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 65.90,
    rating: 4.8,
    reviews: 1186,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.6 GHz Base", "4.2 GHz Boost", "Zen 2"],
    description: "Classic budget gaming CPU with proven performance and reliability",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+3600",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+3600",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+3600"
    }
  },
  {
    id: 31,
    apiId: "B0D5L5QPFN",
    name: "AMD Ryzen 5 7500F 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 165.68,
    rating: 4.5,
    reviews: 26,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.7 GHz Base", "5.0 GHz Boost", "Zen 4"],
    description: "Value-oriented Ryzen 5 without integrated graphics for dedicated GPU builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+7500F",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+7500F",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+7500F"
    }
  },
  {
    id: 32,
    apiId: "B0CHJG8KPV",
    name: "AMD Ryzen 7 5800X 8-Core, 16-Thread Desktop Processor",
    brand: "AMD",
    price: 175.79,
    rating: 4.8,
    reviews: 362,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.8 GHz Base", "4.7 GHz Boost", "Zen 3"],
    description: "High-performance Zen 3 processor for gaming and productivity workloads",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+5800X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+5800X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+5800X"
    }
  },
  {
    id: 33,
    apiId: "B0D5503KNH",
    name: "AMD Ryzen 5 5600X 6-Core, 12-Thread Desktop Processor",
    brand: "AMD",
    price: 179.99,
    rating: 4.8,
    reviews: 707,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.7 GHz Base", "4.6 GHz Boost", "Zen 3"],
    description: "Popular gaming CPU with excellent single-threaded performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5600X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5600X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+5600X"
    }
  },
  // Intel CPUs
  {
    id: 34,
    apiId: "B0CHBJ4LKK",
    name: "Intel Core i7-14700K 20-Core Desktop Processor",
    brand: "Intel",
    price: 334.97,
    rating: 4.6,
    reviews: 44,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["20 Cores (8P+12E)", "3.4 GHz Base", "5.6 GHz Turbo", "Raptor Lake Refresh"],
    description: "Intel's high-performance gaming processor with hybrid architecture",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-14700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-14700K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i7-14700K"
    }
  },
  {
    id: 35,
    apiId: "B0CHJ4D5YZ",
    name: "Intel Core i5-12600K 10-Core Desktop Processor",
    brand: "Intel",
    price: 184.49,
    rating: 4.7,
    reviews: 160,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["10 Cores (6P+4E)", "3.7 GHz Base", "4.9 GHz Turbo", "Alder Lake"],
    description: "Great mid-range Intel processor with hybrid architecture for gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-12600K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-12600K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i5-12600K"
    }
  },
  {
    id: 36,
    apiId: "B0CHJK9V8Z",
    name: "Intel Core i9-12900K 16-Core Desktop Processor",
    brand: "Intel",
    price: 283.16,
    rating: 4.6,
    reviews: 73,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores (8P+8E)", "3.2 GHz Base", "5.2 GHz Turbo", "Alder Lake"],
    description: "High-performance Intel flagship with hybrid architecture",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-12900K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-12900K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i9-12900K"
    }
  },
  {
    id: 37,
    apiId: "B0CHJM5K3F",
    name: "Intel Core i5-13400F 10-Core Desktop Processor",
    brand: "Intel",
    price: 190.61,
    rating: 4.7,
    reviews: 21,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["10 Cores (6P+4E)", "2.5 GHz Base", "4.6 GHz Turbo", "Raptor Lake"],
    description: "Excellent value processor without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-13400F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-13400F",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i5-13400F"
    }
  },
  {
    id: 38,
    apiId: "B0CHJN2K1F",
    name: "Intel Core i3-12100F 4-Core Desktop Processor",
    brand: "Intel",
    price: 87.57,
    rating: 4.7,
    reviews: 56,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores", "3.3 GHz Base", "4.3 GHz Turbo", "Alder Lake"],
    description: "Budget-friendly quad-core processor for entry-level builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i3-12100F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i3-12100F",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i3-12100F"
    }
  },
  {
    id: 39,
    apiId: "B0D8G2K9YH",
    name: "AMD Ryzen 7 8700G 8-Core Desktop Processor",
    brand: "AMD",
    price: 269.00,
    rating: 4.5,
    reviews: 3,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.2 GHz Base", "5.1 GHz Boost", "Zen 4", "Radeon 780M"],
    description: "APU with powerful integrated Radeon graphics for gaming without discrete GPU",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+8700G",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+8700G",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+8700G"
    }
  },
  {
    id: 40,
    apiId: "B0CHJP9KKF",
    name: "Intel Core i9-14900KF 24-Core Desktop Processor",
    brand: "Intel",
    price: 441.95,
    rating: 4.6,
    reviews: 14,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["24 Cores (8P+16E)", "3.2 GHz Base", "6.0 GHz Turbo", "Raptor Lake Refresh"],
    description: "Flagship Intel processor without iGPU for ultimate performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-14900KF",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-14900KF",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i9-14900KF"
    }
  },
  {
    id: 41,
    apiId: "B0D8G3K7YH",
    name: "AMD Ryzen 7 7800X3D 8-Core Desktop Processor",
    brand: "AMD",
    price: 375.99,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.2 GHz Base", "5.0 GHz Boost", "Zen 4", "Radeon"],
    description: "Gaming champion with 3D V-Cache technology",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7800X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7800X3D"
    }
  },
  {
    id: 42,
    apiId: "B0CHJQ5F2F",
    name: "Intel Core Ultra 5 225F 10-Core Desktop Processor",
    brand: "Intel",
    price: 157.97,
    rating: 4.5,
    reviews: 1,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["10 Cores", "3.3 GHz Base", "4.9 GHz Turbo", "Arrow Lake"],
    description: "Next-gen Intel Core Ultra processor with efficiency cores",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+Ultra+5+225F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+Ultra+5+225F"
    }
  },
  {
    id: 43,
    apiId: "B0D8G4K8YH",
    name: "AMD Ryzen 7 8700F 8-Core Desktop Processor",
    brand: "AMD",
    price: 248.97,
    rating: 4.5,
    reviews: 3,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "4.1 GHz Base", "5.0 GHz Boost", "Zen 4"],
    description: "High-performance Zen 4 processor without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+8700F",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+8700F"
    }
  },
  {
    id: 44,
    apiId: "B0D8G5K9YH",
    name: "AMD Ryzen 9 7950X3D 16-Core Desktop Processor",
    brand: "AMD",
    price: 829.98,
    rating: 4.7,
    reviews: 73,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores / 32 Threads", "4.2 GHz Base", "5.7 GHz Boost", "Zen 4", "Radeon"],
    description: "Ultimate gaming and productivity CPU with 3D V-Cache",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+7950X3D",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+7950X3D",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+9+7950X3D"
    }
  },
  {
    id: 45,
    apiId: "B0CHJR6K3F",
    name: "Intel Core Ultra 5 245K 14-Core Desktop Processor",
    brand: "Intel",
    price: 229.89,
    rating: 4.5,
    reviews: 1,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["14 Cores", "4.2 GHz Base", "5.2 GHz Turbo", "Arrow Lake", "Intel Xe"],
    description: "Next-generation Intel Core Ultra with integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+Ultra+5+245K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+Ultra+5+245K"
    }
  },
  {
    id: 46,
    apiId: "B0D8G6K0YH",
    name: "AMD Ryzen 5 8600G 6-Core Desktop Processor",
    brand: "AMD",
    price: 190.00,
    rating: 4.6,
    reviews: 15,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "4.3 GHz Base", "5.0 GHz Boost", "Zen 4", "Radeon 760M"],
    description: "APU with integrated Radeon graphics for budget gaming builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+8600G",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+8600G",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+8600G"
    }
  },
  {
    id: 47,
    apiId: "B0D8G7K1YH",
    name: "AMD Ryzen 9 7950X 16-Core Desktop Processor",
    brand: "AMD",
    price: 501.00,
    rating: 4.6,
    reviews: 51,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores / 32 Threads", "4.5 GHz Base", "5.7 GHz Boost", "Zen 4", "Radeon"],
    description: "Flagship Zen 4 processor for extreme performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+7950X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+7950X",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+9+7950X"
    }
  },
  {
    id: 48,
    apiId: "B0D8G8K2YH",
    name: "AMD Ryzen 3 3200G 4-Core Desktop Processor",
    brand: "AMD",
    price: 66.73,
    rating: 4.6,
    reviews: 63,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 4 Threads", "3.6 GHz Base", "4.0 GHz Boost", "Zen+", "Radeon Vega 8"],
    description: "Budget APU with integrated Vega graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+3+3200G",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+3+3200G"
    }
  },
  {
    id: 49,
    apiId: "B0D8G9K3YH",
    name: "AMD Ryzen 5 5600GT 6-Core Desktop Processor",
    brand: "AMD",
    price: 149.47,
    rating: 4.5,
    reviews: 3,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.6 GHz Base", "4.6 GHz Boost", "Zen 3", "Radeon Vega 7"],
    description: "Zen 3 processor with integrated Radeon graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5600GT",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5600GT"
    }
  },
  {
    id: 50,
    apiId: "B0CHJS7K4F",
    name: "Intel Core i5-10400F 6-Core Desktop Processor",
    brand: "Intel",
    price: 138.27,
    rating: 4.7,
    reviews: 63,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "2.9 GHz Base", "4.3 GHz Turbo", "Comet Lake"],
    description: "Affordable 6-core processor without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-10400F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-10400F"
    }
  },
  {
    id: 51,
    apiId: "B0D8GAK4YH",
    name: "AMD Ryzen 5 3600X 6-Core Desktop Processor",
    brand: "AMD",
    price: 199.99,
    rating: 4.7,
    reviews: 199,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.8 GHz Base", "4.4 GHz Boost", "Zen 2"],
    description: "Popular mid-range Zen 2 processor with excellent value",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+3600X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+3600X"
    }
  },
  {
    id: 52,
    apiId: "B0CHJT8K5F",
    name: "Intel Core i7-9700K 8-Core Desktop Processor",
    brand: "Intel",
    price: 259.00,
    rating: 4.7,
    reviews: 226,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores", "3.6 GHz Base", "4.9 GHz Turbo", "Coffee Lake Refresh", "Intel UHD Graphics 630"],
    description: "8-core Coffee Lake processor for gaming and productivity",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-9700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-9700K"
    }
  },
  {
    id: 53,
    apiId: "B0D8GBK5YH",
    name: "AMD Ryzen 5 2600 6-Core Desktop Processor",
    brand: "AMD",
    price: 99.99,
    rating: 4.7,
    reviews: 500,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.4 GHz Base", "3.9 GHz Boost", "Zen+"],
    description: "Budget-friendly Zen+ processor for entry-level builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+2600",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+2600"
    }
  },
  {
    id: 54,
    apiId: "B0CHJU9K6F",
    name: "Intel Core i3-14100F 4-Core Desktop Processor",
    brand: "Intel",
    price: 96.99,
    rating: 4.5,
    reviews: 1,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 8 Threads", "3.5 GHz Base", "4.7 GHz Turbo", "Raptor Lake Refresh"],
    description: "Budget quad-core processor for basic computing",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i3-14100F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i3-14100F"
    }
  },
  {
    id: 55,
    apiId: "B0CHJV0K7F",
    name: "Intel Core i7-13700K 16-Core Desktop Processor",
    brand: "Intel",
    price: 375.28,
    rating: 4.7,
    reviews: 132,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores (8P+8E)", "3.4 GHz Base", "5.4 GHz Turbo", "Raptor Lake", "Intel UHD Graphics 770"],
    description: "High-performance Raptor Lake processor for gaming and content creation",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-13700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-13700K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i7-13700K"
    }
  },
  {
    id: 56,
    apiId: "B0CHJW1K8F",
    name: "Intel Core i7-14700F 20-Core Desktop Processor",
    brand: "Intel",
    price: 302.99,
    rating: 4.5,
    reviews: 1,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["20 Cores (8P+12E)", "2.1 GHz Base", "5.4 GHz Turbo", "Raptor Lake Refresh"],
    description: "20-core processor without iGPU for high-performance builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-14700F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-14700F"
    }
  },
  {
    id: 57,
    apiId: "B0D8GCK6YH",
    name: "AMD Ryzen 5 5600XT 6-Core Desktop Processor",
    brand: "AMD",
    price: 150.00,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.7 GHz Base", "4.7 GHz Boost", "Zen 3"],
    description: "Enhanced Zen 3 processor with improved clock speeds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5600XT",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5600XT"
    }
  },
  {
    id: 58,
    apiId: "B0D8GDK7YH",
    name: "AMD Ryzen 7 7500F 6-Core Desktop Processor",
    brand: "AMD",
    price: 0,
    rating: 4.6,
    reviews: 41,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.7 GHz Base", "5.0 GHz Boost", "Zen 4"],
    description: "Value Zen 4 processor without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7500F",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7500F"
    }
  },
  {
    id: 59,
    apiId: "B0CHJX2K9F",
    name: "Intel Core i9-14900KS 24-Core Desktop Processor",
    brand: "Intel",
    price: 571.90,
    rating: 4.4,
    reviews: 2,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["24 Cores (8P+16E)", "3.2 GHz Base", "6.2 GHz Turbo", "Raptor Lake Refresh", "Intel UHD Graphics 770"],
    description: "Special edition flagship Intel processor with highest boost clocks",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-14900KS",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-14900KS",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i9-14900KS"
    }
  },
  {
    id: 60,
    apiId: "B0D8GEK8YH",
    name: "AMD Ryzen 5 3400G 4-Core Desktop Processor",
    brand: "AMD",
    price: 83.50,
    rating: 4.6,
    reviews: 55,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 8 Threads", "3.7 GHz Base", "4.2 GHz Boost", "Zen+", "Radeon Vega 11"],
    description: "APU with Radeon Vega 11 graphics for budget builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+3400G",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+3400G"
    }
  },
  {
    id: 61,
    apiId: "B0CHJY3KAF",
    name: "Intel Pentium E2220 2-Core Desktop Processor",
    brand: "Intel",
    price: 12.99,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["2 Cores", "2.4 GHz", "Core"],
    description: "Legacy dual-core processor for basic computing",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Pentium+E2220",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Pentium+E2220"
    }
  },
  {
    id: 62,
    apiId: "B0CHJZ4KBF",
    name: "Intel Core i7-8700K 6-Core Desktop Processor",
    brand: "Intel",
    price: 194.00,
    rating: 4.7,
    reviews: 306,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.7 GHz Base", "4.7 GHz Turbo", "Coffee Lake", "Intel UHD Graphics 630"],
    description: "Popular Coffee Lake processor for gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-8700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-8700K"
    }
  },
  {
    id: 63,
    apiId: "B0CHJA5KCF",
    name: "Intel Xeon E5-2687W V4 12-Core Server Processor",
    brand: "Intel",
    price: 2513.90,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["12 Cores / 24 Threads", "3.0 GHz Base", "3.5 GHz Turbo", "Broadwell"],
    description: "Enterprise-grade Xeon processor for workstations and servers",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Xeon+E5-2687W+V4",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Xeon+E5-2687W+V4"
    }
  },
  {
    id: 64,
    apiId: "B0CHJB6KDF",
    name: "Intel Core Ultra 5 245KF 14-Core Desktop Processor",
    brand: "Intel",
    price: 199.99,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["14 Cores", "4.2 GHz Base", "5.2 GHz Turbo", "Arrow Lake"],
    description: "Next-gen Intel Core Ultra without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+Ultra+5+245KF",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+Ultra+5+245KF"
    }
  },
  {
    id: 65,
    apiId: "B0D8GFK9YH",
    name: "AMD Ryzen 3 4100 4-Core Desktop Processor",
    brand: "AMD",
    price: 64.72,
    rating: 4.5,
    reviews: 7,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 8 Threads", "3.8 GHz Base", "4.0 GHz Boost", "Zen 2"],
    description: "Budget quad-core Zen 2 processor",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+3+4100",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+3+4100"
    }
  },
  {
    id: 66,
    apiId: "B0D8GGKAYD",
    name: "AMD Ryzen 9 7900 12-Core Desktop Processor",
    brand: "AMD",
    price: 399.00,
    rating: 4.5,
    reviews: 19,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["12 Cores / 24 Threads", "3.7 GHz Base", "5.4 GHz Boost", "Zen 4", "Radeon"],
    description: "High-performance 12-core Zen 4 processor",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+7900",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+7900",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+9+7900"
    }
  },
  {
    id: 67,
    apiId: "B0D8GHKBYD",
    name: "AMD Ryzen 9 3900X 12-Core Desktop Processor",
    brand: "AMD",
    price: 280.00,
    rating: 4.7,
    reviews: 280,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["12 Cores / 24 Threads", "3.8 GHz Base", "4.6 GHz Boost", "Zen 2"],
    description: "Popular 12-core Zen 2 processor for content creation",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+3900X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+3900X"
    }
  },
  {
    id: 68,
    apiId: "B0D8GIKC YD",
    name: "AMD Ryzen 5 5500GT 6-Core Desktop Processor",
    brand: "AMD",
    price: 124.99,
    rating: 4.4,
    reviews: 5,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.6 GHz Base", "4.4 GHz Boost", "Zen 3", "Radeon Vega 7"],
    description: "Zen 3 APU with integrated Radeon graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+5+5500GT",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5500GT"
    }
  },
  {
    id: 69,
    apiId: "B0CHJC7KEF",
    name: "Intel Core i7-7700K 4-Core Desktop Processor",
    brand: "Intel",
    price: 184.00,
    rating: 4.6,
    reviews: 304,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 8 Threads", "4.2 GHz Base", "4.5 GHz Turbo", "Kaby Lake", "Intel HD Graphics 630"],
    description: "Kaby Lake quad-core processor for gaming",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-7700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-7700K"
    }
  },
  {
    id: 70,
    apiId: "B0CHJD8KFF",
    name: "Intel Core i9-9900K 8-Core Desktop Processor",
    brand: "Intel",
    price: 399.00,
    rating: 4.7,
    reviews: 211,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.6 GHz Base", "5.0 GHz Turbo", "Coffee Lake Refresh", "Intel UHD Graphics 630"],
    description: "High-performance Coffee Lake processor",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-9900K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-9900K"
    }
  },
  {
    id: 71,
    apiId: "B0D8GJKCYD",
    name: "AMD Ryzen 7 2700X 8-Core Desktop Processor",
    brand: "AMD",
    price: 255.49,
    rating: 4.7,
    reviews: 360,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.7 GHz Base", "4.3 GHz Boost", "Zen+"],
    description: "8-core Zen+ processor with excellent value",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+2700X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+2700X"
    }
  },
  {
    id: 72,
    apiId: "B0CHJE9KGF",
    name: "Intel Core i9-13900K 24-Core Desktop Processor",
    brand: "Intel",
    price: 571.59,
    rating: 4.6,
    reviews: 66,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["24 Cores (8P+16E)", "3.0 GHz Base", "5.8 GHz Turbo", "Raptor Lake", "Intel UHD Graphics 770"],
    description: "Flagship Raptor Lake processor for ultimate performance",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-13900K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-13900K",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i9-13900K"
    }
  },
  {
    id: 73,
    apiId: "B0CHJFAKHF",
    name: "Intel Core i7-10700K 8-Core Desktop Processor",
    brand: "Intel",
    price: 350.99,
    rating: 4.6,
    reviews: 104,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.8 GHz Base", "5.1 GHz Turbo", "Comet Lake", "Intel UHD Graphics 630"],
    description: "8-core Comet Lake processor for gaming and productivity",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i7-10700K",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i7-10700K"
    }
  },
  {
    id: 74,
    apiId: "B0D8GKKDYD",
    name: "AMD Threadripper 3970X 32-Core Desktop Processor",
    brand: "AMD",
    price: 1699.99,
    rating: 4.5,
    reviews: 8,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["32 Cores / 64 Threads", "3.7 GHz Base", "4.5 GHz Boost", "Zen 2"],
    description: "Extreme workstation processor with 32 cores",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Threadripper+3970X",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Threadripper+3970X"
    }
  },
  {
    id: 75,
    apiId: "B0CHJGBKIF",
    name: "Intel Core i3-6100 2-Core Desktop Processor",
    brand: "Intel",
    price: 24.00,
    rating: 4.6,
    reviews: 159,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["2 Cores / 4 Threads", "3.7 GHz", "Skylake", "Intel HD Graphics 530"],
    description: "Budget dual-core Skylake processor",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i3-6100",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i3-6100"
    }
  },
  {
    id: 76,
    apiId: "B0D8GLKEYD",
    name: "AMD Ryzen 9 5900XT 16-Core Desktop Processor",
    brand: "AMD",
    price: 283.55,
    rating: 4.5,
    reviews: 1,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores / 32 Threads", "3.3 GHz Base", "4.8 GHz Boost", "Zen 3"],
    description: "16-core Zen 3 processor for high-end builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+5900XT",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+5900XT"
    }
  },
  {
    id: 77,
    apiId: "B0CHJHCKJF",
    name: "Intel Core i9-12900KF 16-Core Desktop Processor",
    brand: "Intel",
    price: 279.97,
    rating: 4.5,
    reviews: 8,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["16 Cores (8P+8E)", "3.2 GHz Base", "5.2 GHz Turbo", "Alder Lake"],
    description: "High-performance Alder Lake without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i9-12900KF",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i9-12900KF"
    }
  },
  {
    id: 78,
    apiId: "B0D8GMKFYD",
    name: "AMD Ryzen 9 9600 6-Core Desktop Processor",
    brand: "AMD",
    price: 279.85,
    rating: 0,
    reviews: 0,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 12 Threads", "3.8 GHz Base", "5.2 GHz Boost", "Zen 5", "Radeon"],
    description: "Latest Zen 5 processor with integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+9+9600",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+9+9600"
    }
  },
  {
    id: 79,
    apiId: "B0CHJIDKKF",
    name: "Intel Core i5-9400F 6-Core Desktop Processor",
    brand: "Intel",
    price: 119.99,
    rating: 4.6,
    reviews: 48,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores / 6 Threads", "2.9 GHz Base", "4.1 GHz Turbo", "Coffee Lake Refresh"],
    description: "Budget 6-core processor without integrated graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-9400F",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-9400F"
    }
  },
  {
    id: 80,
    apiId: "B0CHJJEKLF",
    name: "Intel Core i5-12400 6-Core Desktop Processor",
    brand: "Intel",
    price: 215.99,
    rating: 4.6,
    reviews: 38,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["6 Cores (6P+0E)", "2.5 GHz Base", "4.4 GHz Turbo", "Alder Lake", "Intel UHD Graphics 730"],
    description: "Mid-range Alder Lake processor with excellent value",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i5-12400",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i5-12400",
      bestbuy: "https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i5-12400"
    }
  },
  {
    id: 81,
    apiId: "B0D8GNKGYD",
    name: "AMD Ryzen 7 7700 8-Core Desktop Processor",
    brand: "AMD",
    price: 275.95,
    rating: 4.5,
    reviews: 3,
    imageUrl: "https://m.media-amazon.com/images/I/61Gzcp17QsL._AC_SL1500_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["8 Cores / 16 Threads", "3.6 GHz Base", "5.3 GHz Boost", "Zen 4", "Radeon"],
    description: "Zen 4 processor with integrated Radeon graphics",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=AMD+Ryzen+7+7700",
      newegg: "https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7700"
    }
  },
  {
    id: 82,
    apiId: "B0CHJKFLMF",
    name: "Intel Core i3-12100 4-Core Desktop Processor",
    brand: "Intel",
    price: 210.35,
    rating: 4.5,
    reviews: 16,
    imageUrl: "https://m.media-amazon.com/images/I/51Q2VRm04xL._AC_SL1280_.jpg",
    category: "cpu",
    inStock: true,
    specs: ["4 Cores / 8 Threads", "3.3 GHz Base", "4.3 GHz Turbo", "Alder Lake", "Intel UHD Graphics 730"],
    description: "Budget Alder Lake processor for basic builds",
    purchaseLinks: {
      amazon: "https://www.amazon.com/s?k=Intel+Core+i3-12100",
      newegg: "https://www.newegg.com/p/pl?d=Intel+Core+i3-12100"
    }
  },
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    const result = await bulkAddParts(initialParts);
    console.log(`✅ Successfully seeded ${result.insertedCount} parts into the database!`);
    return result;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Expose to window for easy access in console
if (typeof window !== 'undefined') {
  (window as any).seedDatabase = seedDatabase;
}
