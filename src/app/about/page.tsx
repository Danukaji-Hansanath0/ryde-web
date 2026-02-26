'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-8 gradient-text text-center drop-shadow-lg">About Ryde</h1>

                    <div className="glass-premium p-8 md:p-12 rounded-2xl mb-12">
                        <p className="text-xl leading-relaxed text-gray-200 mb-6">
                            Founded in 2024, Ryde was created with a singular vision: to redefine the car rental experience. We believe that the journey is just as important as the destination, which is why we offer a fleet that inspires and excites.
                        </p>
                        <p className="text-xl leading-relaxed text-gray-200">
                            From high-performance sports cars to luxurious sedans and rugged SUVs, every vehicle in our collection is maintained to the highest standards. Our commitment to technology and service ensures a seamless, paperless, and frictionless experience from booking to return.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
                        <div className="glass-premium p-6 rounded-xl">
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">5+</h3>
                            <p className="text-gray-300">Years of Excellence</p>
                        </div>
                        <div className="glass-premium p-6 rounded-xl">
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">10k+</h3>
                            <p className="text-gray-300">Happy Customers</p>
                        </div>
                        <div className="glass-premium p-6 rounded-xl">
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">500+</h3>
                            <p className="text-gray-300">Premium Vehicles</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                        <p className="text-2xl italic text-gray-300 max-w-2xl mx-auto">
                            "To empower journeys with freedom, style, and uncompromising quality."
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
