'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    const tiers = [
        {
            name: 'Standard',
            icon: Star,
            price: '$150',
            period: '/day',
            description: 'Perfect for everyday luxury',
            features: [
                'Premium sedans & SUVs',
                'Basic insurance included',
                '200 miles per day',
                '24/7 roadside assistance',
                'Free pickup at select locations',
                'Standard cleaning'
            ],
            cta: 'Browse Standard Fleet',
            popular: false
        },
        {
            name: 'Premium',
            icon: Zap,
            price: '$350',
            period: '/day',
            description: 'Elevated luxury experience',
            features: [
                'High-performance vehicles',
                'Comprehensive insurance',
                'Unlimited mileage',
                '24/7 concierge service',
                'Free delivery & pickup',
                'Premium detailing',
                'GPS navigation included',
                'Priority support'
            ],
            cta: 'Browse Premium Fleet',
            popular: true
        },
        {
            name: 'Elite',
            icon: Crown,
            price: '$750',
            period: '/day',
            description: 'Ultimate luxury & exclusivity',
            features: [
                'Exotic & rare supercars',
                'Full coverage insurance',
                'Unlimited mileage',
                'Dedicated concierge',
                'White-glove delivery',
                'Professional detailing',
                'All add-ons included',
                'VIP priority access',
                'Chauffeur service available',
                'Exclusive member benefits'
            ],
            cta: 'Browse Elite Fleet',
            popular: false
        }
    ];

    const addons = [
        { name: 'Additional Driver', price: '$25/day' },
        { name: 'GPS Navigation', price: '$15/day' },
        { name: 'Child Seat', price: '$10/day' },
        { name: 'Full Insurance Upgrade', price: '$50/day' },
        { name: 'Chauffeur Service', price: '$100/hour' },
        { name: 'Airport Delivery', price: '$75' },
        { name: 'Premium Fuel Package', price: '$100' },
        { name: 'Extended Hours', price: '$30/hour' }
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Transparent Pricing</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose the perfect tier for your luxury car rental needs. No hidden fees, no surprises.
                    </p>
                </motion.div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            className={`glass-premium p-8 rounded-3xl relative ${tier.popular ? 'border-2 border-blue-500' : ''
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <tier.icon className="mx-auto mb-4 text-blue-500" size={48} />
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-bold">{tier.price}</span>
                                    <span className="text-gray-400">{tier.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/fleet"
                                className={`w-full btn-modern py-3 rounded-xl font-bold flex items-center justify-center ${tier.popular
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                                    } transition-all`}
                            >
                                {tier.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Add-ons */}
                <motion.div
                    className="glass-premium p-8 rounded-3xl mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Optional Add-ons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {addons.map((addon, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl">
                                <div className="font-medium mb-1">{addon.name}</div>
                                <div className="text-blue-400 font-bold">{addon.price}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                    className="glass-premium p-8 rounded-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Pricing FAQs</h2>
                    <div className="space-y-6 max-w-3xl mx-auto">
                        <div>
                            <h3 className="font-bold mb-2">Are there any hidden fees?</h3>
                            <p className="text-gray-400">No. All prices shown include taxes and basic fees. Optional add-ons are clearly listed.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">What's included in the insurance?</h3>
                            <p className="text-gray-400">All tiers include liability coverage. Premium and Elite tiers include comprehensive coverage with lower deductibles.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Can I get a discount for longer rentals?</h3>
                            <p className="text-gray-400">Yes! Rentals of 7+ days receive automatic discounts. Check our <Link href="/offers" className="text-blue-500 hover:text-blue-400">special offers</Link> page for current promotions.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-400">We accept all major credit cards, debit cards, and digital payment methods.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
