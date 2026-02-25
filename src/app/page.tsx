'use client';

import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import ServicesSection from '@/components/ServicesSection';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <HeroSection />
      <FleetSection />
      <ServicesSection />
    </main>
  );
}
