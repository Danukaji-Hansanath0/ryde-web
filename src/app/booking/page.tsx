'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Calendar, MapPin, Shield, CreditCard, User, Mail, Phone, Check } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/booking/confirmation');
    };

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Complete Your Booking
                </motion.h1>

                {/* Progress Steps */}
                <div className="flex justify-between mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500'
                                }`}>
                                {step > s ? <Check size={20} /> : s}
                            </div>
                            {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-500' : 'bg-gray-800'}`} />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="glass-premium p-8 rounded-3xl">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="text-blue-500" />
                                Rental Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Pickup Date</label>
                                    <input type="date" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Return Date</label>
                                    <input type="date" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-200 mb-2">Pickup Location</label>
                                <select className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white">
                                    <option>Downtown HQ</option>
                                    <option>International Airport</option>
                                    <option>Westside Luxury Hub</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <User className="text-blue-500" />
                                Your Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                                    <input type="text" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                                    <input type="email" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Phone</label>
                                    <input type="tel" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">License Number</label>
                                    <input type="text" className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white" required />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="text-blue-500" />
                                Payment & Add-ons
                            </h2>

                            <div className="mb-6">
                                <h3 className="font-bold mb-4">Add-ons</h3>
                                <div className="space-y-3">
                                    {['Full Insurance Coverage (+$50/day)', 'GPS Navigation (+$15/day)', 'Child Seat (+$10/day)'].map((addon, i) => (
                                        <label key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                            <input type="checkbox" className="rounded bg-white/10 border-white/20 text-blue-500" />
                                            <span>{addon}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                                <div className="flex justify-between mb-2">
                                    <span>Rental (3 days)</span>
                                    <span className="font-bold">$3,600</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm mb-4">
                                    <span>Add-ons</span>
                                    <span>$0</span>
                                </div>
                                <div className="border-t border-blue-500/30 pt-4 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-blue-400">$3,600</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="flex gap-4 mt-8">
                        {step > 1 && (
                            <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button type="button" onClick={() => setStep(step + 1)} className="flex-1 btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold">
                                Continue
                            </button>
                        ) : (
                            <button type="submit" className="flex-1 btn-modern bg-gradient-to-r from-blue-600 to-red-500 text-white py-3 rounded-xl font-bold">
                                Confirm Booking
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
