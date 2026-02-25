'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingWidget() {
  const router = useRouter();

  // Default dates: tomorrow → +3 days
  const defaultPickup = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })();
  const defaultDropoff = (() => { const d = new Date(); d.setDate(d.getDate() + 4); return d.toISOString().split('T')[0]; })();

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(defaultPickup);
  const [dropoffDate, setDropoffDate] = useState(defaultDropoff);
  const [carType, setCarType] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pickupDate) params.set('startDate', pickupDate);
    if (dropoffDate) params.set('endDate', dropoffDate);
    if (pickupLocation) params.set('location', pickupLocation);
    if (carType && carType !== 'all') params.set('carType', carType);

    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <div className="glass-premium rounded-3xl p-8 max-w-5xl mx-auto glow-primary floating backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-text-primary font-semibold mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Pickup Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="City, Airport, or Address"
              className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-text-secondary" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-text-primary font-semibold mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Drop-off Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Same as pickup"
              className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-text-secondary" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-text-primary font-semibold mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-text-primary focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-text-primary font-semibold mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Drop-off Date
          </label>
          <input
            type="date"
            value={dropoffDate}
            min={pickupDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-text-primary focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-text-primary font-semibold mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Car Type
          </label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-text-primary focus:border-primary focus:outline-none transition-colors"
          >
            <option value="all">All Cars</option>
            <option value="economy">Economy</option>
            <option value="compact">Compact</option>
            <option value="midsize">Midsize</option>
            <option value="luxury">Luxury</option>
            <option value="suv">SUV</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="lg:col-span-5">
          <button
            onClick={handleSearch}
            className="btn-modern w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-5 rounded-xl hover:from-blue-600 hover:to-blue-700 font-bold text-xl shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            <Search className="w-6 h-6 mr-3" />
            Search Available Cars
          </button>
        </div>
      </div>
    </div>
  );
}
