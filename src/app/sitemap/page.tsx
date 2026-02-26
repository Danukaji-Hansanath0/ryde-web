'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import {
    Home, Car, Wrench, MapPin, Info, Phone, HelpCircle,
    LogIn, UserPlus, LayoutDashboard, Calendar, Shield,
    FileText, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function SiteMapPage() {
    const sections = [
        {
            title: 'Main Pages',
            icon: Home,
            pages: [
                { name: 'Home', path: '/', icon: Home, description: 'Landing page with hero section and booking widget' },
                { name: 'Our Fleet', path: '/fleet', icon: Car, description: 'Browse our complete vehicle collection' },
                { name: 'Services', path: '/services', icon: Wrench, description: 'Explore our premium services' },
                { name: 'Locations', path: '/locations', icon: MapPin, description: 'Find our office locations' },
                { name: 'About Us', path: '/about', icon: Info, description: 'Learn about our company' },
            ]
        },
        {
            title: 'Booking & Account',
            icon: Calendar,
            pages: [
                { name: 'Book a Vehicle', path: '/booking', icon: Calendar, description: 'Complete your rental booking' },
                { name: 'Sign In', path: '/signin', icon: LogIn, description: 'Access your account' },
                { name: 'Register', path: '/register', icon: UserPlus, description: 'Create a new account' },
                { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, description: 'Manage your bookings and profile' },
            ]
        },
        {
            title: 'Support & Information',
            icon: HelpCircle,
            pages: [
                { name: 'Contact Us', path: '/contact', icon: Phone, description: 'Get in touch with our team' },
                { name: 'FAQ', path: '/faq', icon: HelpCircle, description: 'Frequently asked questions' },
                { name: 'Privacy Policy', path: '/privacy', icon: Shield, description: 'Our privacy and data protection policy' },
                { name: 'Terms of Service', path: '/terms', icon: FileText, description: 'Rental terms and conditions' },
            ]
        }
    ];

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Site Map</h1>
                    <p className="text-xl text-gray-300">Explore all pages and features of Ryde</p>
                </motion.div>

                <div className="space-y-12">
                    {sections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/20 p-3 rounded-xl">
                                    <section.icon className="text-blue-500" size={28} />
                                </div>
                                <h2 className="text-3xl font-bold">{section.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.pages.map((page, pageIndex) => (
                                    <Link key={page.path} href={page.path}>
                                        <motion.div
                                            className="glass-premium p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (sectionIndex * 0.1) + (pageIndex * 0.05) }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                                        <page.icon className="text-blue-500" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                                            {page.name}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm">{page.description}</p>
                                                        <div className="mt-3 text-blue-500 text-sm font-medium flex items-center gap-1">
                                                            {page.path}
                                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12 glass-premium p-8 rounded-3xl text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-4">Need Help Finding Something?</h3>
                    <p className="text-gray-300 mb-6">Our support team is here to assist you 24/7</p>
                    <Link href="/contact">
                        <button className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold">
                            Contact Support
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
