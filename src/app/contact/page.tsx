'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Get In Touch
                </motion.h1>
                <motion.p
                    className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Have questions? We're here to help 24/7
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                                <input type="text" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                                <input type="email" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                                <textarea rows={6} className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        {[
                            { icon: Phone, title: 'Phone', info: '1-800-RYDE-NOW', sub: 'Mon-Sun 24/7' },
                            { icon: Mail, title: 'Email', info: 'support@ryde.com', sub: 'We reply within 24h' },
                            { icon: MapPin, title: 'Office', info: '123 Premium Blvd', sub: 'City Center, NY 10001' },
                            { icon: Clock, title: 'Hours', info: '24/7 Service', sub: 'Always available' },
                        ].map((item, i) => (
                            <div key={i} className="glass-premium p-6 rounded-2xl flex items-start gap-4">
                                <div className="bg-blue-500/20 p-3 rounded-xl">
                                    <item.icon className="text-blue-500" size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">{item.title}</div>
                                    <div className="font-bold text-lg">{item.info}</div>
                                    <div className="text-sm text-gray-400">{item.sub}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
