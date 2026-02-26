'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Calendar, Car, User, Settings, LogOut, Clock, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const bookings = [
        { id: 'RYD123ABC', car: 'Porsche 911 GT3', status: 'Active', pickup: 'Jan 28, 2026', return: 'Jan 31, 2026', location: 'Downtown HQ' },
        { id: 'RYD456DEF', car: 'Mercedes S-Class', status: 'Completed', pickup: 'Jan 15, 2026', return: 'Jan 18, 2026', location: 'Airport' },
    ];

    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Welcome Back, John</h1>
                        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your rental overview.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: Car, label: 'Active Rentals', value: '1' },
                        { icon: Calendar, label: 'Total Bookings', value: '12' },
                        { icon: Clock, label: 'Hours Driven', value: '248' },
                        { icon: MapPin, label: 'Cities Visited', value: '8' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <stat.icon className="text-blue-500 mb-3" size={32} />
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">My Bookings</h2>
                            <Link href="/dashboard/bookings" className="text-blue-500 hover:text-blue-400 transition-colors font-medium flex items-center gap-1">
                                See All
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {bookings.slice(0, 2).map((booking, i) => (
                                <motion.div
                                    key={booking.id}
                                    className="glass-premium p-6 rounded-2xl"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">Booking #{booking.id}</div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{booking.car}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${booking.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-400 mb-1">Pickup</div>
                                            <div className="font-medium">{booking.pickup}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 mb-1">Return</div>
                                            <div className="font-medium">{booking.return}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 mb-1">Location</div>
                                            <div className="font-medium">{booking.location}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                        <div className="space-y-4">
                            <button className="w-full glass-premium p-4 rounded-xl hover:bg-white/10 transition-colors text-left flex items-center gap-3">
                                <User className="text-blue-500" />
                                <span>Edit Profile</span>
                            </button>
                            <button className="w-full glass-premium p-4 rounded-xl hover:bg-white/10 transition-colors text-left flex items-center gap-3">
                                <Settings className="text-blue-500" />
                                <span>Settings</span>
                            </button>
                            <button className="w-full glass-premium p-4 rounded-xl hover:bg-white/10 transition-colors text-left flex items-center gap-3">
                                <Calendar className="text-blue-500" />
                                <span>View Calendar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
