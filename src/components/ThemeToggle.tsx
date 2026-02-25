'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-14 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <Moon size={20} className="text-gray-800 dark:text-white" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'light' ? 0 : 180,
                    scale: theme === 'light' ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <Sun size={20} className="text-gray-800 dark:text-white" />
            </motion.div>
        </motion.button>
    );
}
