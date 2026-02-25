'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password reset email logic
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-4 transition-colors duration-300">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-md">
                <Link href="/signin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Sign In
                </Link>

                <motion.div
                    className="glass-premium p-8 rounded-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {!submitted ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="text-blue-500" size={32} />
                                </div>
                                <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                                <p className="text-gray-400">No worries, we'll send you reset instructions.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white dark:bg-black/60 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                >
                                    Send Reset Link
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-green-500" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
                            </p>
                            <Link href="/signin" className="text-blue-500 hover:text-blue-400 transition-colors">
                                Return to Sign In
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
