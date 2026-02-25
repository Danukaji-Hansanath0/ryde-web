'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Calendar, MapPin, Car, Filter, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

type BookingStatus = 'all' | 'active' | 'upcoming' | 'completed' | 'cancelled';

export default function MyBookingsPage() {
    const [filter, setFilter] = useState<BookingStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const bookings = [
        { id: 'RYD123ABC', car: 'Porsche 911 GT3', image: '/cars/porsche-911.jpg', status: 'active', pickup: 'Jan 28, 2026', return: 'Jan 31, 2026', location: 'Downtown HQ', price: '$3,600' },
        { id: 'RYD456DEF', car: 'Mercedes S-Class', image: '/cars/mercedes-s.jpg', status: 'upcoming', pickup: 'Feb 5, 2026', return: 'Feb 8, 2026', location: 'Airport', price: '$2,400' },
        { id: 'RYD789GHI', car: 'BMW M5', image: '/cars/bmw-m5.jpg', status: 'completed', pickup: 'Jan 15, 2026', return: 'Jan 18, 2026', location: 'Downtown HQ', price: '$2,100' },
        { id: 'RYD012JKL', car: 'Audi R8', image: '/cars/audi-r8.jpg', status: 'completed', pickup: 'Dec 20, 2025', return: 'Dec 25, 2025', location: 'Westside Hub', price: '$4,500' },
        { id: 'RYD345MNO', car: 'Tesla Model S', image: '/cars/tesla-s.jpg', status: 'cancelled', pickup: 'Jan 10, 2026', return: 'Jan 12, 2026', location: 'Airport', price: '$1,200' },
    ];

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === 'all' || booking.status === filter;
        const matchesSearch = booking.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">My Bookings</h1>
                    <p className="text-gray-400">Manage and track all your rentals</p>
                </motion.div>

                {/* Filters and Search */}
                <div className="glass-premium p-6 rounded-2xl mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by car or booking ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/60 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 flex-wrap">
                            {(['all', 'active', 'upcoming', 'completed', 'cancelled'] as BookingStatus[]).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${filter === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking, i) => (
                            <motion.div
                                key={booking.id}
                                className="glass-premium p-6 rounded-2xl hover:bg-white/10 transition-all"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Car Image */}
                                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                                        <Car size={48} className="text-blue-500" />
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="text-sm text-gray-400 mb-1">Booking #{booking.id}</div>
                                                <h3 className="text-2xl font-bold">{booking.car}</h3>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold border capitalize ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <div className="text-gray-400 text-sm mb-1 flex items-center gap-1">
                                                    <Calendar size={16} />
                                                    Pickup
                                                </div>
                                                <div className="font-medium">{booking.pickup}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400 text-sm mb-1 flex items-center gap-1">
                                                    <Calendar size={16} />
                                                    Return
                                                </div>
                                                <div className="font-medium">{booking.return}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400 text-sm mb-1 flex items-center gap-1">
                                                    <MapPin size={16} />
                                                    Location
                                                </div>
                                                <div className="font-medium">{booking.location}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400 text-sm mb-1">Total</div>
                                                <div className="font-bold text-blue-400 text-lg">{booking.price}</div>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/dashboard/bookings/${booking.id}`}
                                            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors font-medium"
                                        >
                                            View Details
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="glass-premium p-12 rounded-2xl text-center">
                            <Car size={64} className="text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">No bookings found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                            <Link
                                href="/fleet"
                                className="inline-block btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold"
                            >
                                Browse Fleet
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
