'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { CheckCircle, Calendar, MapPin, Car, Download, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
    const bookingRef = 'RYD' + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12 flex items-center">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-2xl">
                <motion.div
                    className="glass-premium p-12 rounded-3xl text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="mb-6"
                    >
                        <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                    </motion.div>

                    <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
                    <p className="text-gray-400 mb-8">Your reservation has been successfully processed</p>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                        <div className="text-sm text-gray-400 mb-2">Booking Reference</div>
                        <div className="text-3xl font-bold text-blue-400 tracking-wider">{bookingRef}</div>
                    </div>

                    <div className="text-left space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <Car className="text-blue-500" size={24} />
                            <div>
                                <div className="text-sm text-gray-400">Vehicle</div>
                                <div className="font-bold">Porsche 911 GT3</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <Calendar className="text-blue-500" size={24} />
                            <div>
                                <div className="text-sm text-gray-400">Rental Period</div>
                                <div className="font-bold">Jan 28 - Jan 31, 2026</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <MapPin className="text-blue-500" size={24} />
                            <div>
                                <div className="text-sm text-gray-400">Pickup Location</div>
                                <div className="font-bold">Downtown HQ</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <button className="flex-1 btn-modern bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Download size={20} />
                            Download Receipt
                        </button>
                        <button className="flex-1 btn-modern bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Mail size={20} />
                            Email Confirmation
                        </button>
                    </div>

                    <Link href="/dashboard">
                        <button className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold mb-4">
                            View My Bookings
                        </button>
                    </Link>

                    <Link href="/fleet" className="text-blue-400 hover:text-blue-300 text-sm">
                        Book Another Vehicle
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
