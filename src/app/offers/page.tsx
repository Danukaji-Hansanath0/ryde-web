'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Tag, Clock, Calendar, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
    const offers = [
        {
            id: 1,
            title: 'Weekend Getaway Special',
            discount: '25% OFF',
            description: 'Book any luxury vehicle for the weekend and save 25%. Perfect for a romantic escape or adventure.',
            validUntil: 'Feb 28, 2026',
            code: 'WEEKEND25',
            category: 'Weekend',
            featured: true
        },
        {
            id: 2,
            title: 'First Time Renter',
            discount: '$100 OFF',
            description: 'New to Ryde? Get $100 off your first rental. Experience luxury for less.',
            validUntil: 'Mar 31, 2026',
            code: 'FIRST100',
            category: 'New Customer',
            featured: true
        },
        {
            id: 3,
            title: 'Extended Rental Discount',
            discount: '30% OFF',
            description: 'Rent for 7+ days and receive 30% off. Perfect for business trips or extended vacations.',
            validUntil: 'Apr 15, 2026',
            code: 'EXTENDED30',
            category: 'Long Term',
            featured: false
        },
        {
            id: 4,
            title: 'Corporate Package',
            discount: '20% OFF',
            description: 'Special rates for business travelers. Includes insurance and GPS at no extra cost.',
            validUntil: 'Dec 31, 2026',
            code: 'CORPORATE20',
            category: 'Business',
            featured: false
        },
        {
            id: 5,
            title: 'Early Bird Special',
            discount: '15% OFF',
            description: 'Book 30 days in advance and save 15%. Plan ahead and save big.',
            validUntil: 'Jun 30, 2026',
            code: 'EARLY15',
            category: 'Advance Booking',
            featured: false
        },
        {
            id: 6,
            title: 'Loyalty Rewards',
            discount: '35% OFF',
            description: 'For our valued returning customers. Book your 5th rental and get 35% off.',
            validUntil: 'Dec 31, 2026',
            code: 'LOYAL35',
            category: 'Loyalty',
            featured: true
        }
    ];

    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Special Offers</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Exclusive deals and promotions to make your luxury car rental even more affordable.
                    </p>
                </motion.div>

                {/* Featured Offers */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Gift className="text-blue-500" />
                        Featured Deals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.filter(offer => offer.featured).map((offer, i) => (
                            <motion.div
                                key={offer.id}
                                className="glass-premium p-6 rounded-2xl border-2 border-blue-500/30 hover:border-blue-500/50 transition-all relative overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {offer.discount}
                                </div>

                                <div className="mb-4">
                                    <span className="text-xs text-blue-400 font-medium">{offer.category}</span>
                                    <h3 className="text-2xl font-bold mt-1 mb-3">{offer.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{offer.description}</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Calendar size={16} />
                                        Valid until {offer.validUntil}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag size={16} className="text-blue-500" />
                                        <code className="bg-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono font-bold">
                                            {offer.code}
                                        </code>
                                    </div>
                                </div>

                                <Link
                                    href="/fleet"
                                    className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    Book Now
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* All Offers */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">All Offers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.filter(offer => !offer.featured).map((offer, i) => (
                            <motion.div
                                key={offer.id}
                                className="glass-premium p-6 rounded-2xl hover:bg-white/10 transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                            >
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-400 font-medium">{offer.category}</span>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
                                            {offer.discount}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{offer.description}</p>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Calendar size={14} />
                                        Valid until {offer.validUntil}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag size={14} className="text-blue-500" />
                                        <code className="bg-blue-500/20 px-2 py-1 rounded text-blue-400 font-mono text-sm">
                                            {offer.code}
                                        </code>
                                    </div>
                                </div>

                                <Link
                                    href="/fleet"
                                    className="text-blue-500 hover:text-blue-400 transition-colors font-medium flex items-center gap-2 text-sm"
                                >
                                    Apply Offer
                                    <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Terms */}
                <motion.div
                    className="glass-premium p-6 rounded-2xl mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="font-bold mb-3">Terms & Conditions</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Offers cannot be combined with other promotions</li>
                        <li>• Discount codes must be entered at checkout</li>
                        <li>• Some restrictions may apply based on vehicle availability</li>
                        <li>• Offers are subject to change without notice</li>
                        <li>• Valid for new bookings only</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
