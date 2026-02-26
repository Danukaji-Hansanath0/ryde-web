'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { XCircle, Mail, Clock, AlertTriangle, DollarSign, CheckCircle, CloudLightning } from 'lucide-react';

const policies = [
    {
        icon: Clock,
        color: 'blue',
        title: '48-Hour Written Notice',
        text: 'The lessee is required to provide formal written notice to the rental agency of any cancellation that occurs within 48 hours before the pickup or delivery of the rental car.',
    },
    {
        icon: Mail,
        color: 'blue',
        title: 'How to Notify Us',
        text: 'The lessee must send formal notice of cancellation to:',
        contact: 'info@rydeflexi.com',
    },
    {
        icon: CheckCircle,
        color: 'green',
        title: 'Refund Processing Time',
        text: 'Upon receiving formal notice of cancellation, the rental agency will have up to 14 (fourteen) business days to process a refund.',
    },
    {
        icon: AlertTriangle,
        color: 'yellow',
        title: 'No-Show Fee',
        text: 'If a reservation is not cancelled in writing or by phone and the lessee does not appear, a no-show fee equivalent to one day\'s rental will be charged.',
    },
    {
        icon: DollarSign,
        color: 'red',
        title: 'Late Cancellation Fee',
        text: 'If a reservation is cancelled within 48 hours of pickup, the lessee will be charged a cancellation fee of USD 50.00, including VAT.',
    },
    {
        icon: CheckCircle,
        color: 'green',
        title: 'Free Cancellation Window',
        text: 'If you cancel your rental car booking more than 48 hours before the pickup time, you won\'t have to pay any fee for cancelling.',
    },
    {
        icon: CloudLightning,
        color: 'yellow',
        title: 'Force Majeure',
        text: 'If a booking is cancelled, delayed, or affected because of a force majeure event, Ryde Flexi won\'t give a refund. However, the Renter can move the booking to another date within 12 months of the original booking.',
    },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    blue: { bg: 'bg-blue-500/15', icon: 'text-blue-400', badge: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
    green: { bg: 'bg-green-500/15', icon: 'text-green-400', badge: 'bg-green-500/10 border-green-500/30 text-green-300' },
    yellow: { bg: 'bg-yellow-500/15', icon: 'text-yellow-400', badge: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300' },
    red: { bg: 'bg-red-500/15', icon: 'text-red-400', badge: 'bg-red-500/10 border-red-500/30 text-red-300' },
};

export default function CancellationPage() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-16">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
                        <XCircle className="text-blue-400" size={18} />
                        <span className="text-blue-300 text-sm font-medium">Cancellation &amp; Refund Policy</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                        Cancellations &amp; Refunds
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Understand our cancellation rules and refund process before making a booking with Ryde Flexi.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">Effective Date: February 24, 2026</p>
                </motion.div>

                {/* Intro Card */}
                <motion.div
                    className="glass-premium p-6 rounded-2xl mb-8 border border-blue-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-gray-300 leading-relaxed">
                        The following notice outlines Ryde Flexi&apos;s policies in respect of cancellation and/or refund. By making a booking with us, you acknowledge and agree to these terms.
                    </p>
                </motion.div>

                {/* Policy Cards */}
                <div className="space-y-5">
                    {policies.map((policy, i) => {
                        const Icon = policy.icon;
                        const colors = colorMap[policy.color];
                        return (
                            <motion.div
                                key={i}
                                className="glass-premium rounded-2xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                            >
                                <div className="flex items-start gap-5 p-6">
                                    <div className={`${colors.bg} p-3 rounded-xl flex-shrink-0 mt-0.5`}>
                                        <Icon className={colors.icon} size={22} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-bold text-white">{policy.title}</h2>
                                        <p className="text-gray-300 leading-relaxed">{policy.text}</p>
                                        {policy.contact && (
                                            <a
                                                href={`mailto:${policy.contact}`}
                                                className={`inline-flex items-center gap-2 mt-1 text-sm font-medium px-4 py-2 rounded-lg border ${colors.badge} transition-opacity hover:opacity-80`}
                                            >
                                                <Mail size={14} />
                                                {policy.contact}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Quick Reference Table */}
                <motion.div
                    className="glass-premium rounded-2xl overflow-hidden mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5">
                        <div className="bg-blue-500/15 p-3 rounded-xl">
                            <XCircle className="text-blue-400" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Quick Reference</h2>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-400 border-b border-white/10">
                                    <th className="pb-3 pr-6 font-semibold">Cancellation Timing</th>
                                    <th className="pb-3 font-semibold">Fee / Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 divide-y divide-white/5">
                                <tr>
                                    <td className="py-3 pr-6">More than 48 hours before pickup</td>
                                    <td className="py-3 text-green-400 font-medium">No fee — Free cancellation</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6">Within 48 hours of pickup</td>
                                    <td className="py-3 text-red-400 font-medium">USD 50.00 cancellation fee (incl. VAT)</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6">No-show (no notice given)</td>
                                    <td className="py-3 text-red-400 font-medium">One day&apos;s rental charged</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6">Refund processing time</td>
                                    <td className="py-3 text-blue-400 font-medium">Up to 14 business days</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6">Force majeure event</td>
                                    <td className="py-3 text-yellow-400 font-medium">No refund — rebooking within 12 months</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    className="text-center text-gray-500 text-sm mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    © {new Date().getFullYear()} Ryde Flexi. All rights reserved.
                </motion.p>
            </div>
        </div>
    );
}
