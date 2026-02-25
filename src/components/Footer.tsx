'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <h3 className="text-4xl font-bold text-blue-500">Ryde</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for premium car rental services. Experience comfort, reliability, and exceptional service with every journey.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-semibold"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <motion.p
                  className="text-green-400 mt-2 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Successfully subscribed!
                </motion.p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Our Fleet', path: '/fleet' },
                { name: 'Services', path: '/services' },
                { name: 'Locations', path: '/locations' },
                { name: 'About Us', path: '/about' },
                { name: 'Site Map', path: '/sitemap' }
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.path}
                    className="text-gray-400 hover:text-blue-500 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {['Car Rental', 'Long-term Rentals', 'Corporate Services', 'Airport Transfers', 'Chauffeur Service'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <div>1-800-RYDE-NOW</div>
                  <div className="text-sm">Mon-Fri 8AM-8PM</div>
                </div>
              </div>
              <div className="flex items-start text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <div>info@ryde.com</div>
                  <div className="text-sm">support@ryde.com</div>
                </div>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <div>123 Main Street</div>
                  <div>New York, NY 10001</div>
                </div>
              </div>
            </div>

            {/* Contact Badge */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                <div>
                  <div className="font-semibold">24/7 Support Available</div>
                  <div className="text-sm text-gray-400">Get help anytime, anywhere</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* App Download Section */}
        <motion.div
          className="border-t border-gray-800 pt-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-2xl font-bold mb-2">Download Our Mobile App</h4>
              <p className="text-gray-400">Book cars on the go with our mobile application</p>
            </div>
            <div className="flex gap-4">
              <motion.button
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mr-3">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </motion.button>
              <motion.button
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mr-3">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2024 Ryde Car Rental. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="/cancellation" className="hover:text-blue-500 transition-colors">Cancellation &amp; Refund</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ChevronUp size={24} />
      </motion.button>
    </footer>
  );
}
