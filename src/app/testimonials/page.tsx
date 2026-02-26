'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Star, Quote } from 'lucide-react';
import { COLORS } from '@/constants/colours';

export default function TestimonialsPage() {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Business Executive',
            rating: 5,
            text: 'Absolutely phenomenal service! The Porsche 911 was in pristine condition and the entire rental process was seamless. Will definitely be using Ryde for all my luxury car needs.',
            date: 'Jan 20, 2026',
            car: 'Porsche 911 GT3'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Tech Entrepreneur',
            rating: 5,
            text: 'Ryde exceeded all my expectations. The Mercedes S-Class was perfect for my business trip. Professional staff, easy booking, and the car was delivered right to my hotel.',
            date: 'Jan 18, 2026',
            car: 'Mercedes S-Class'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Wedding Planner',
            rating: 5,
            text: 'Used Ryde for my wedding day and it was magical! The Rolls-Royce was stunning and made our special day even more memorable. Highly recommend!',
            date: 'Jan 15, 2026',
            car: 'Rolls-Royce Ghost'
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'Real Estate Developer',
            rating: 5,
            text: 'Best luxury car rental experience I\'ve ever had. The BMW M5 was a dream to drive and the customer service was top-notch. Five stars all around!',
            date: 'Jan 12, 2026',
            car: 'BMW M5'
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Fashion Designer',
            rating: 5,
            text: 'Ryde is my go-to for luxury rentals. The Lamborghini Huracán turned heads everywhere I went. The booking process is so easy and the cars are always immaculate.',
            date: 'Jan 10, 2026',
            car: 'Lamborghini Huracán'
        },
        {
            id: 6,
            name: 'James Wilson',
            role: 'Investment Banker',
            rating: 5,
            text: 'Professional, reliable, and luxurious. Exactly what you want in a premium car rental service. The Audi R8 was incredible and the whole experience was flawless.',
            date: 'Jan 8, 2026',
            car: 'Audi R8'
        }
    ];

    const stats = [
        { value: '10,000+', label: 'Happy Customers' },
        { value: '4.9/5', label: 'Average Rating' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '5,000+', label: 'Five Star Reviews' }
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">What Our Clients Say</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our satisfied customers have to say about their Ryde experience.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="glass-premium p-6 rounded-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            className="glass-premium p-6 rounded-2xl hover:bg-white/10 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Quote className="text-blue-500 mb-4" size={32} />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill={COLORS.primary} className="text-blue-500" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>

                            {/* Customer Info */}
                            <div className="border-t border-gray-700 pt-4">
                                <div className="font-bold">{testimonial.name}</div>
                                <div className="text-sm text-gray-400">{testimonial.role}</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {testimonial.car} • {testimonial.date}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="glass-premium p-12 rounded-3xl text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Ryde for their luxury car rental needs.
                    </p>
                    <a
                        href="/fleet"
                        className="inline-block btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                        Browse Our Fleet
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
