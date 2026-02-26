'use client';

import { motion } from 'framer-motion';
import { Star, Shield, Award, TrendingUp, Users, Car } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: Shield, label: 'Fully Insured', description: 'Comprehensive coverage included' },
    { icon: Award, label: 'Award Winning', description: 'Best car rental service 2024' },
    { icon: TrendingUp, label: 'Price Match', description: 'Best price guaranteed' },
    { icon: Users, label: '100K+ Customers', description: 'Trusted by thousands' },
    { icon: Star, label: '4.8 Rating', description: 'Outstanding reviews' },
    { icon: Car, label: '500+ Vehicles', description: 'Modern, well-maintained fleet' }
  ];

  return (
    <motion.div
      className="fixed top-24 right-4 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="glass-premium rounded-2xl p-4 shadow-xl border border-border">
        <h4 className="text-sm font-bold text-text-primary mb-3 text-center">Why Trust Us?</h4>
        <div className="space-y-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                className="flex items-start space-x-3 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 + index * 0.1 }}
                whileHover={{ x: -5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-surface/50 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-text-primary">{badge.label}</div>
                  <div className="text-xs text-text-secondary">{badge.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
