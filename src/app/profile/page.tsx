'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService, { User } from '@/services/authService';
import { motion } from 'framer-motion';
import { User as UserIcon, MapPin, LogOut, Mail, Phone, Building } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!authService.isAuthenticated()) {
                    router.push('/signin');
                    return;
                }

                const data = await authService.getProfile();
                setUser(data.user);
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
                // If unauthorized, authService.getProfile might have already triggered logout,
                // but we can ensure redirect here if needed.
                if (err.message.includes('401')) {
                    router.push('/signin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = () => {
        authService.logout();
        router.push('/signin');
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="text-red-500 text-xl font-semibold mb-4">Error: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!user) {
        return null; // Should redirect
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-32 md:h-48 relative">
                            <div className="absolute -bottom-12 left-8 md:left-12">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
                                    {user.logoUrl ? (
                                        <img src={user.logoUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                            <UserIcon size={40} className="text-gray-400 dark:text-gray-300" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-8 px-8 md:px-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                        {user.firstName} {user.lastName}
                                    </h1>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                                        <Mail size={16} className="mr-2" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        {user.emailVerified ? (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                                        ) : (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Unverified</span>
                                        )}
                                        {user.isActive && (
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">Active</span>
                                        )}
                                        {user.roles && user.roles.map(role => (
                                            <span key={role} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2 capitalize">{role}</span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="mt-4 md:mt-0 flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <MapPin className="mr-2 text-blue-500" />
                                Addresses
                            </h2>

                            {user.addresses && user.addresses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.addresses.map((address) => (
                                        <div key={address.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-500 transition-colors relative group">
                                            {address.isPrimary && (
                                                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                    Primary
                                                </div>
                                            )}
                                            <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                                <Building size={16} className="mr-2 text-gray-400" />
                                                {address.businessName || 'Address'}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{address.streetAddress}</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                {address.city}, {address.state} {address.postalCode}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                                                <MapPin size={14} className="mr-1" />
                                                {address.country}
                                            </p>
                                            {(address.contactPerson || address.phoneNumber) && (
                                                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                                    {address.contactPerson && <p className="text-xs text-gray-500">Contact: {address.contactPerson}</p>}
                                                    {address.phoneNumber && (
                                                        <p className="text-xs text-gray-500 flex items-center mt-1">
                                                            <Phone size={12} className="mr-1" />
                                                            {address.phoneNumber}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No addresses found.
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
