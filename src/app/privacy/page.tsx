'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Shield, Info, Share2, Lock, UserCheck, Clock, RefreshCw, Mail } from 'lucide-react';

const sections = [
    {
        icon: Info,
        title: '1. Information We Collect',
        content: (
            <p>
                We may collect the following types of personal information when you book a rental or interact with us:
            </p>
        ),
        bullets: [
            'Full name, address, phone number, and email',
            'Driver\'s license details (number, issuing country, expiry date)',
            'Payment information (credit/debit card details, billing address)',
            'Rental and booking history',
            'Website usage information (e.g., IP address, browser type, and pages visited)',
        ],
    },
    {
        icon: Shield,
        title: '2. Why We Collect Your Information',
        content: <p>We use your personal information strictly for the following purposes:</p>,
        bullets: [
            'To confirm, manage, and complete your car rental booking',
            'To process payments and issue invoices or receipts',
            'To contact you with booking confirmations or necessary updates',
            'To improve customer experience and service quality',
            'To meet legal obligations under International law',
        ],
    },
    {
        icon: Share2,
        title: '3. Sharing of Information',
        content: null,
        bullets: [
            'We do not sell, rent, or trade your personal information.',
            'We may share your information only with trusted third parties such as payment processors or service providers involved in the operation of our business – strictly for service-related purposes.',
            'In certain circumstances, we may also disclose your personal information without prior notice if required to do so by law, regulation, or legal process, or when such disclosure is necessary to protect our rights, safety, or the rights and safety of others.',
        ],
    },
    {
        icon: Lock,
        title: '4. Data Security',
        content: (
            <p>
                We implement appropriate technical and organizational measures to safeguard your personal information from unauthorized access, loss, or misuse.
            </p>
        ),
        bullets: [],
    },
    {
        icon: UserCheck,
        title: '5. Your Privacy Rights',
        content: <p>You have the right to:</p>,
        bullets: [
            'Request access to the personal information we hold about you',
            'Request corrections to any inaccurate or outdated information',
            'Withdraw consent to the use of your data (where applicable)',
        ],
        footer: 'To make any such requests, please contact us using the details below.',
    },
    {
        icon: Clock,
        title: '6. How Long We Keep Your Info',
        content: (
            <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined above and to comply with legal and regulatory requirements.
            </p>
        ),
        bullets: [],
    },
    {
        icon: RefreshCw,
        title: '7. Changes to This Policy',
        content: (
            <p>
                We may update this Privacy Policy from time to time. The latest version will always be available on our website, and the &quot;Effective Date&quot; at the top will indicate when it was last updated.
            </p>
        ),
        bullets: [],
    },
    {
        icon: Mail,
        title: '8. Need to Talk to Us?',
        content: (
            <p>
                If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact:
            </p>
        ),
        bullets: [],
        contact: 'info@rydeflexi.com',
    },
];

export default function PrivacyPage() {
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
                        <Shield className="text-blue-400" size={18} />
                        <span className="text-blue-300 text-sm font-medium">Your Privacy Matters</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Ryde Flexi is committed to protecting your personal information and being transparent about how we use it.
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
                        Ryde Flexi offers affordable and reliable car rental services for global clients. The company provides a wide range of vehicles, including small cars, SUVs, and vans, suitable for different travel needs. Customers can choose between self-drive and chauffeur-driven options. With simple booking, friendly service, and competitive prices, Ryde aims to make every journey safe, comfortable, and hassle-free.
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={i}
                                className="glass-premium rounded-2xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5">
                                    <div className="bg-blue-500/15 p-3 rounded-xl flex-shrink-0">
                                        <Icon className="text-blue-400" size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                                </div>

                                {/* Section Body */}
                                <div className="p-6 pt-4 text-gray-300 leading-relaxed space-y-3">
                                    {section.content}

                                    {section.bullets && section.bullets.length > 0 && (
                                        <ul className="space-y-2 mt-2">
                                            {section.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.footer && (
                                        <p className="text-gray-400 mt-3 text-sm italic">{section.footer}</p>
                                    )}

                                    {section.contact && (
                                        <a
                                            href={`mailto:${section.contact}`}
                                            className="inline-flex items-center gap-2 mt-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                        >
                                            <Mail size={16} />
                                            {section.contact}
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

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
