'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThreeBackground() {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0 z-0 bg-white dark:bg-black transition-colors duration-300">
            {/* Background Image with Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
            </motion.div>

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

                <ambientLight intensity={theme === 'dark' ? 0.2 : 0.5} />

                <Suspense fallback={null}>
                    <Environment preset={theme === 'dark' ? "night" : "sunset"} />
                    <Stars
                        radius={100}
                        depth={50}
                        count={theme === 'dark' ? 5000 : 2000}
                        factor={4}
                        saturation={theme === 'dark' ? 0 : 0.3}
                        fade
                        speed={1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
