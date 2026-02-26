'use client';

import { motion } from 'framer-motion';
import { Car, Fuel, Users, Shield, Star, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import vehicleService, { Vehicle } from '@/services/vehicleService';

interface CategoryGroup {
  name: string;
  description: string;
  cars: Vehicle[];
  price: string;
  image: string;
  features: string[];
  rating: number;
  popularity: string;
}

const CATEGORY_META: { [key: string]: any } = {
  'Economy': {
    description: 'Budget-friendly and fuel-efficient',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Manual', 'AC', 'Bluetooth'],
    popularity: 'Best Value'
  },
  'Compact': {
    description: 'Perfect for city driving',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c6f88f?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Manual/Auto', 'AC', 'Cruise Control'],
    popularity: 'Most Popular'
  },
  'Midsize': {
    description: 'Comfort and space combined',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba95d42b9?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Auto', 'Leather', 'Sunroof'],
    popularity: 'Comfort Choice'
  },
  'Luxury': {
    description: 'Travel in style and comfort',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Auto', 'Premium Audio', 'Navigation'],
    popularity: 'Premium'
  },
  'SUV': {
    description: 'Space for family and adventures',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop&auto=format',
    features: ['7 Seats', 'Auto', 'AWD', 'Cargo Space'],
    popularity: 'Family Favorite'
  },
  'Premium': {
    description: 'Experience the extraordinary',
    image: 'https://images.unsplash.com/photo-1549398516-129e56d04d48?w=400&h=250&fit=crop&auto=format',
    features: ['4-5 Seats', 'Auto', 'Premium', 'Performance'],
    popularity: 'Exclusive'
  }
};

export default function FleetSection() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFleet = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        const response = await vehicleService.getAvailableVehicles({
          startDate: today.toISOString().split('T')[0],
          endDate: nextWeek.toISOString().split('T')[0],
          page: 0,
          pageSize: 50
        });

        // Group by bodyTypeName
        const groups: { [key: string]: Vehicle[] } = {};
        response.data.forEach(v => {
          const type = v.bodyTypeName || 'Other';
          if (!groups[type]) groups[type] = [];
          groups[type].push(v);
        });

        const mappedCategories: CategoryGroup[] = Object.entries(groups).map(([name, cars]) => {
          const meta = CATEGORY_META[name] || {
            description: 'High quality vehicles for any trip',
            image: cars[0].colorImages?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
            features: ['Premium Quality', 'Well Maintained'],
            popularity: 'New Arrival'
          };

          const minPrice = Math.min(...cars.map(c => c.dailyRentalPrice));
          const avgRating = cars.reduce((acc, c) => acc + (c.averageRating || 0), 0) / cars.length;

          return {
            name,
            description: meta.description,
            cars: cars,
            price: `From $${minPrice}/day`,
            image: meta.image,
            features: meta.features,
            rating: parseFloat(avgRating.toFixed(1)) || 5.0,
            popularity: meta.popularity
          };
        });

        // Sort categories to match the previous hardcoded order if possible
        const order = ['Economy', 'Compact', 'Midsize', 'Luxury', 'SUV', 'Premium'];
        mappedCategories.sort((a, b) => {
          const idxA = order.indexOf(a.name);
          const idxB = order.indexOf(b.name);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });

        setCategories(mappedCategories);
      } catch (err: any) {
        console.error("Failed to load fleet categories", err);
        setError("Failed to load our fleet. Please check back later.");
      } finally {
        setLoading(false);
      }
    };

    loadFleet();
  }, []);

  return (
    <section id="fleet" className="py-24 bg-white dark:bg-gradient-to-br dark:from-gray-50 dark:to-gray-100 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-900 mb-6">
            Our Premium <span className="text-blue-500">Fleet</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our wide selection of modern, well-maintained vehicles to suit your needs and budget
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500">Loading our amazing fleet...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/5 rounded-3xl border border-red-500/10">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="card-3d group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white dark:bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  {/* Image container with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized // For remote UI images if needed, or if next/image errors on unsplash
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {category.popularity}
                    </motion.div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{category.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900">{category.name}</h3>
                      <span className="text-blue-500 font-bold text-lg">{category.price}</span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{category.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Top Rated Models:</h4>
                      <div className="space-y-1">
                        {category.cars.slice(0, 3).map((car, carIndex) => (
                          <div key={car.id} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            {car.vehicleMakeName} {car.vehicleModel}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link href={`/fleet?category=${category.name}`}>
                      <button className="btn-modern w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center group">
                        View {category.name} Cars
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-600 mb-6">Can't find what you're looking for?</p>
          <Link href="/fleet" className="inline-block btn-modern bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg">
            See All Cars
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
