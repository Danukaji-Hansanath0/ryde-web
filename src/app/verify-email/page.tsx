'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const token = searchParams.get('token');

    useEffect(() => {
        // TODO: Implement email verification logic
        const verifyEmail = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                setStatus('success');
            } catch (error) {
                setStatus('error');
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setStatus('error');
        }
    }, [token]);

    return (
        <motion.div
            className="glass-premium p-8 rounded-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {status === 'loading' && (
                <>
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Loader className="text-blue-500 animate-spin" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Verifying Your Email</h1>
                    <p className="text-gray-400">Please wait while we verify your email address...</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Email Verified!</h1>
                    <p className="text-gray-400 mb-6">Your email has been successfully verified. You can now access all features.</p>
                    <Link
                        href="/signin"
                        className="inline-block btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                        Continue to Sign In
                    </Link>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="text-red-500" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Verification Failed</h1>
                    <p className="text-gray-400 mb-6">The verification link is invalid or has expired.</p>
                    <Link
                        href="/register"
                        className="inline-block btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                        Back to Registration
                    </Link>
                </>
            )}
        </motion.div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-4 transition-colors duration-300">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-md">
                <Suspense fallback={
                    <div className="glass-premium p-8 rounded-3xl text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Loader className="text-blue-500 animate-spin" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Loading...</h1>
                    </div>
                }>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </div>
    );
}
