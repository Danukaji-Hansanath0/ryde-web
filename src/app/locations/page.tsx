'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';

export default function LocationsPage() {
    const locations = [
        {
            name: "Downtown HQ",
            address: "123 Premium Blvd, City Center",
            phone: "+1 (555) 123-4567",
            hours: "24/7"
        },
        {
            name: "International Airport",
            address: "Terminal 1, Arrivals Hall",
            phone: "+1 (555) 987-6543",
            hours: "24/7"
        },
        {
            name: "Westside Luxury Hub",
            address: "456 Sunset Drive, Beverly Hills",
            phone: "+1 (555) 246-8135",
            hours: "08:00 AM - 10:00 PM"
        },
        {
            name: "North Tech District",
            address: "789 Innovation Way, Silicon Valley",
            phone: "+1 (555) 369-2580",
            hours: "09:00 AM - 08:00 PM"
        }
    ];

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-4 gradient-text text-center drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Our Locations
                </motion.h1>
                <motion.p
                    className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Conveniently located in major city centers and airports.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {locations.map((loc, index) => (
                        <motion.div
                            key={index}
                            className="glass-premium p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="bg-blue-500/20 p-4 rounded-full">
                                <MapPin className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{loc.name}</h3>
                                <p className="text-gray-300 mb-4">{loc.address}</p>
                                <div className="flex items-center gap-2 text-gray-400 mb-2">
                                    <Phone size={16} />
                                    <span>{loc.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock size={16} />
                                    <span>{loc.hours}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Map Placeholder */}
                <motion.div
                    className="glass-premium w-full h-96 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                    <div className="relative z-10 text-center">
                        <p className="text-2xl font-bold text-white mb-2">Interactive Map Loading...</p>
                        <p className="text-gray-400">View real-time availability across our network</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
