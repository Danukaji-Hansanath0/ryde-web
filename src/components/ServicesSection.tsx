'use client';

import { motion } from 'framer-motion';
import { Headphones, Shield, Clock, MapPin, Car, Award, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: Shield,
    title: 'Full Insurance Coverage',
    description: 'Comprehensive insurance included with every rental for your peace of mind',
    image: 'https://images.unsplash.com/photo-1608097527777-e8633b8235c2?w=300&h=200&fit=crop&auto=format',
    features: ['Collision Coverage', 'Theft Protection', 'Liability Insurance']
  },
  {
    icon: Clock,
    title: '24/7 Roadside Assistance',
    description: 'We\'re here for you around the clock with emergency support wherever you are',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format',
    features: ['24/7 Support', 'Emergency Towing', 'On-site Assistance']
  },
  {
    icon: Car,
    title: 'Well-Maintained Fleet',
    description: 'Our vehicles are regularly serviced and maintained to highest safety standards',
    image: 'https://images.unsplash.com/photo-1554224154-260325c0593c?w=300&h=200&fit=crop&auto=format',
    features: ['Regular Service', 'Safety Checks', 'Clean Vehicles']
  },
  {
    icon: MapPin,
    title: 'Multiple Locations',
    description: 'Convenient pickup and drop-off locations across the country',
    image: 'https://images.unsplash.com/photo-1564304765-0bf266480c62?w=300&h=200&fit=crop&auto=format',
    features: ['Airport Pickup', 'City Locations', 'Hotel Delivery']
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Dedicated support team ready to help you with any questions or concerns',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&auto=format',
    features: ['Live Chat', 'Phone Support', 'Email Assistance']
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'Find a better price? We\'ll match it and give you an additional 10% off',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&h=200&fit=crop&auto=format',
    features: ['Price Match', '10% Extra Off', 'Best Rates']
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-blue-100"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-900 mb-6">
            Why Choose <span className="text-blue-500">Ryde?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing exceptional car rental services with customer satisfaction at the heart of everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-3d bg-white dark:bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-100">
                  {/* Image section */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

                    {/* Icon overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/services" className="text-blue-500 font-semibold flex items-center group-hover:text-blue-600 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=400&fit=crop&auto=format"
              alt="Car rental background"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-500/90"></div>
          </div>

          <div className="relative z-10 p-16 text-center text-white">
            <motion.h3
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Hit the Road?
            </motion.h3>

            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join thousands of satisfied customers who trust Ryde for their car rental needs
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/fleet">
                <motion.div
                  className="btn-modern bg-white text-blue-500 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your Car Now
                </motion.div>
              </Link>
              <motion.button
                className="btn-modern border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-500 transition-all duration-300 font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Our App
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex justify-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: '✓', text: 'No Hidden Fees' },
                { icon: '✓', text: 'Free Cancellation' },
                { icon: '✓', text: '24/7 Support' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/80">
                  <span className="text-green-400 font-bold">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
