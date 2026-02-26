'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Calendar, MapPin, Car, Download, XCircle, ArrowLeft, Phone, Mail, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BookingDetailsPage() {
    const params = useParams();
    const bookingId = params.id as string;

    // Mock data - replace with actual API call
    const booking = {
        id: bookingId,
        car: 'Porsche 911 GT3',
        status: 'active',
        pickup: { date: 'Jan 28, 2026', time: '10:00 AM', location: 'Downtown HQ', address: '123 Main St, City' },
        return: { date: 'Jan 31, 2026', time: '10:00 AM', location: 'Downtown HQ', address: '123 Main St, City' },
        price: { base: 3600, insurance: 150, gps: 45, total: 3795 },
        driver: { name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', license: 'DL123456' },
        addons: ['Full Insurance Coverage', 'GPS Navigation']
    };

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

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to My Bookings
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Booking #{booking.id}</div>
                            <h1 className="text-4xl font-bold">{booking.car}</h1>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border capitalize ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Car Preview */}
                        <motion.div
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                                <Car size={96} className="text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold">{booking.car}</h3>
                        </motion.div>

                        {/* Pickup & Return */}
                        <motion.div
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="text-blue-500" />
                                Rental Period
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-400 mb-2">Pickup</div>
                                    <div className="font-bold text-lg mb-1">{booking.pickup.date} at {booking.pickup.time}</div>
                                    <div className="text-gray-400 flex items-start gap-2">
                                        <MapPin size={16} className="mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium">{booking.pickup.location}</div>
                                            <div className="text-sm">{booking.pickup.address}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-2">Return</div>
                                    <div className="font-bold text-lg mb-1">{booking.return.date} at {booking.return.time}</div>
                                    <div className="text-gray-400 flex items-start gap-2">
                                        <MapPin size={16} className="mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium">{booking.return.location}</div>
                                            <div className="text-sm">{booking.return.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Driver Information */}
                        <motion.div
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold mb-4">Driver Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Name</div>
                                    <div className="font-medium">{booking.driver.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">License Number</div>
                                    <div className="font-medium">{booking.driver.license}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                                        <Mail size={14} />
                                        Email
                                    </div>
                                    <div className="font-medium">{booking.driver.email}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                                        <Phone size={14} />
                                        Phone
                                    </div>
                                    <div className="font-medium">{booking.driver.phone}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Price Breakdown */}
                        <motion.div
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h3 className="text-xl font-bold mb-4">Price Breakdown</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Base Rate (3 days)</span>
                                    <span className="font-medium">${booking.price.base}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Insurance</span>
                                    <span className="font-medium">${booking.price.insurance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">GPS Navigation</span>
                                    <span className="font-medium">${booking.price.gps}</span>
                                </div>
                                <div className="border-t border-gray-700 pt-3 flex justify-between text-lg">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-blue-400">${booking.price.total}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Add-ons */}
                        <motion.div
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold mb-4">Add-ons</h3>
                            <div className="space-y-2">
                                {booking.addons.map((addon, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-300">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        {addon}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <button className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                <Download size={20} />
                                Download Invoice
                            </button>
                            {booking.status === 'upcoming' && (
                                <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-red-500/30">
                                    <XCircle size={20} />
                                    Cancel Booking
                                </button>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
