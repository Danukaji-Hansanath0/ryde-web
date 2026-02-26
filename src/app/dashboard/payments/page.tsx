'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { CreditCard, Plus, Trash2, Star } from 'lucide-react';
import { useState } from 'react';

export default function PaymentMethodsPage() {
    const [cards, setCards] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/27', isDefault: false },
    ]);

    const [showAddCard, setShowAddCard] = useState(false);

    const getCardIcon = (type: string) => {
        // In production, use actual card brand logos
        return <CreditCard className="text-blue-500" size={32} />;
    };

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Payment Methods</h1>
                        <p className="text-gray-400">Manage your saved payment cards</p>
                    </div>
                    <button
                        onClick={() => setShowAddCard(!showAddCard)}
                        className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Card
                    </button>
                </motion.div>

                {/* Add Card Form */}
                {showAddCard && (
                    <motion.div
                        className="glass-premium p-6 rounded-2xl mb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    maxLength={19}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        maxLength={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold"
                                >
                                    Add Card
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddCard(false)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Saved Cards */}
                <div className="space-y-4">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            className="glass-premium p-6 rounded-2xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {getCardIcon(card.type)}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg">{card.type} •••• {card.last4}</span>
                                            {card.isDefault && (
                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full flex items-center gap-1">
                                                    <Star size={12} fill="currentColor" />
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-gray-400 text-sm">Expires {card.expiry}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {!card.isDefault && (
                                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                                            Set as Default
                                        </button>
                                    )}
                                    <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {cards.length === 0 && (
                    <div className="glass-premium p-12 rounded-2xl text-center">
                        <CreditCard size={64} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No payment methods</h3>
                        <p className="text-gray-400 mb-6">Add a card to make bookings faster</p>
                        <button
                            onClick={() => setShowAddCard(true)}
                            className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold"
                        >
                            Add Your First Card
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
