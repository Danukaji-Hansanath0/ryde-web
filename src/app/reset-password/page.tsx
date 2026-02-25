'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password reset logic
        if (formData.password === formData.confirmPassword) {
            router.push('/signin?reset=success');
        }
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-4 transition-colors duration-300">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-md">
                <motion.div
                    className="glass-premium p-8 rounded-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-blue-500" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Your new password must be different from previously used passwords.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors pr-12"
                                    placeholder="Enter new password"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors pr-12"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-red-500 text-sm">Passwords do not match</p>
                        )}

                        <button
                            type="submit"
                            className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                            disabled={formData.password !== formData.confirmPassword}
                        >
                            Reset Password
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
