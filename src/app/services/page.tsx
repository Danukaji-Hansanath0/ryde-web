'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, UserCheck, Heart, Sparkles } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';

export default function ServicesPage() {
    const services = [
        {
            title: "Chauffeur Service",
            description: "Experience the ultimate luxury with our professional chauffeurs. Perfect for special occasions or business travel.",
            icon: <UserCheck className="w-12 h-12 text-blue-500" />
        },
        {
            title: "Corporate Fleet",
            description: "Tailored solutions for businesses. Priority booking, detailed reporting, and special corporate rates.",
            icon: <Shield className="w-12 h-12 text-blue-500" />
        },
        {
            title: "Airport Transfers",
            description: "Reliable and comfortable transfers to and from all major airports. Flight tracking ensures we are there when you land.",
            icon: <Clock className="w-12 h-12 text-blue-500" />
        },
        {
            title: "Wedding & Events",
            description: "Make your special day unforgettable with our premium fleet. Decorations and personalized service included.",
            icon: <Heart className="w-12 h-12 text-blue-500" />
        },
        {
            title: "Long Term Rentals",
            description: "Flexible long-term rental options with significant savings. Keep the car for a month or a year.",
            icon: <MapPin className="w-12 h-12 text-blue-500" />
        },
        {
            title: "Premium Experience",
            description: "Access to our most exclusive vehicles and concierge services for a truly VIP experience.",
            icon: <Sparkles className="w-12 h-12 text-blue-500" />
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
                    Our Services
                </motion.h1>
                <motion.p
                    className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Beyond just rentals, we offer a complete premium mobility experience tailored to your needs.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-premium p-8 rounded-2xl group hover:bg-white/5 transition-all cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-white/10 w-fit p-4 rounded-xl mb-6 group-hover:bg-blue-500/20 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
