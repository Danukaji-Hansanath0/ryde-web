'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import authService from '@/services/authService';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    checkAuth();

    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const navItems = [
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Services', path: '/services' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/">
              <motion.h1
                className="text-4xl font-bold text-blue-500 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Ryde
              </motion.h1>
            </Link>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.path} className="relative group">
                <motion.span
                  className="text-gray-700 dark:text-white/80 group-hover:text-blue-500 transition-colors font-medium inline-block cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}

            {isAuthenticated ? (
              <Link href="/profile">
                <motion.div
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={24} className="text-gray-700 dark:text-gray-300" />
                </motion.div>
              </Link>
            ) : (
              <Link href="/signin">
                <motion.button
                  className="btn-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </motion.nav>

          <motion.button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <motion.nav
              className="flex flex-col space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.path} onClick={() => setIsMenuOpen(false)}>
                  <motion.span
                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors font-medium cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
              {isAuthenticated ? (
                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <User size={20} />
                    <span>My Profile</span>
                  </motion.div>
                </Link>
              ) : (
                <Link href="/signin">
                  <motion.button
                    className="btn-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg w-fit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}
            </motion.nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
