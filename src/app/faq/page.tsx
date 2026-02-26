'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: 'What do I need to rent a car?', a: 'You need a valid driver\'s license, a credit card in your name, and proof of insurance. International renters may need an International Driving Permit.' },
        { q: 'What is your cancellation policy?', a: 'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours incur a 50% fee.' },
        { q: 'Can I add an additional driver?', a: 'Yes, additional drivers can be added for $15/day. They must meet the same requirements as the primary driver.' },
        { q: 'What insurance options are available?', a: 'We offer Full Coverage ($50/day), Collision Damage Waiver ($35/day), and Theft Protection ($25/day).' },
        { q: 'Is there a mileage limit?', a: 'Most rentals include unlimited mileage. Exotic vehicles may have daily limits - check specific car details.' },
        { q: 'Can I pick up and drop off at different locations?', a: 'Yes, one-way rentals are available for an additional fee depending on the distance between locations.' },
    ];

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Frequently Asked Questions
                </motion.h1>
                <motion.p
                    className="text-xl text-center text-gray-300 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Find answers to common questions about our service
                </motion.p>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className="glass-premium rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-6 flex justify-between items-center hover:bg-white/5 transition-colors text-left"
                            >
                                <span className="font-bold text-lg">{faq.q}</span>
                                <ChevronDown className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                            </button>
                            {openIndex === i && (
                                <motion.div
                                    className="px-6 pb-6 text-gray-300"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
