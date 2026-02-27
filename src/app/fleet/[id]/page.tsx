'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import ThreeBackground from '@/components/ThreeBackground';
import { ArrowLeft, Users, Gauge, Fuel, Check, Calendar, Shield, Loader2 } from 'lucide-react';
import BookingWizard from '@/components/booking/BookingWizard';
import authService from '@/services/authService';
import vehicleService, { Vehicle, getFullImageUrl } from '@/services/vehicleService';
import { useState, useEffect } from 'react';

export default function CarDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const carId = params.id as string;

    const [car, setCar] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    // Date range state
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
    });
    const [endDate, setEndDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 4);
        return d;
    });

    useEffect(() => {
        const fetchDetails = async () => {
            if (!carId) return;
            try {
                setLoading(true);
                const vehicle = await vehicleService.getVehicleDetails(parseInt(carId));
                setCar(vehicle);
            } catch (err: any) {
                console.error("Failed to fetch vehicle details", err);
                setError(err.message || "Failed to load vehicle details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [carId]);

    // Calculate rental days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = rentalDays * (car?.dailyRentalPrice || 0);

    const formatDateForInput = (date: Date) => {
        try {
            return date.toISOString().split('T')[0];
        } catch (e) {
            return '';
        }
    };

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        const newDate = new Date(value);
        if (isNaN(newDate.getTime())) return;

        if (type === 'start') {
            setStartDate(newDate);
            if (newDate >= endDate) {
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setEndDate(nextDay);
            }
        } else {
            if (newDate <= startDate) {
                const prevDay = new Date(newDate);
                prevDay.setDate(prevDay.getDate() - 1);
                setStartDate(prevDay);
            }
            setEndDate(newDate);
        }
    };

    if (loading) {
        return (
            <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-400">Loading vehicle details...</p>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">{error || "Vehicle Not Found"}</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-blue-500 hover:text-blue-400 flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <button
                    onClick={() => router.back()}
                    className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Fleet
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden glass-premium"
                    >
                        <img
                            src={getFullImageUrl(car.colorImages?.[0]?.imageUrl) || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format'}
                            alt={`${car.vehicleMakeName} ${car.vehicleModel}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                {car.bodyTypeName}
                            </span>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{car.vehicleMakeName} {car.vehicleModel}</h1>
                        <p className="text-3xl font-bold text-blue-500 mb-8">
                            ${car.dailyRentalPrice}
                            <span className="text-lg text-gray-400 font-normal"> / day</span>
                        </p>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-gray-800 pb-8">
                            {car.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-gray-400 text-sm mb-1">Color</div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    <Shield size={20} className="text-blue-500" />
                                    {car.colorName}
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-gray-400 text-sm mb-1">Model Year</div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    <Gauge size={20} className="text-blue-500" />
                                    {car.vehicleYear}
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-gray-400 text-sm mb-1">Owner</div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    <Users size={20} className="text-blue-500" />
                                    {car.ownerName}
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-gray-400 text-sm mb-1">Location</div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    <Fuel size={20} className="text-blue-500" />
                                    {car.location}
                                </div>
                            </div>
                        </div>

                        {car.equipmentList && car.equipmentList.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-4">Included Equipment</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {car.equipmentList.map((eq, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="bg-blue-500/20 p-1 rounded-full">
                                                <Check size={14} className="text-blue-500" />
                                            </div>
                                            {eq.equipmentName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rental Period & Price Calculation */}
                        <div className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-500" />
                                Select Rental Period
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Pickup Date</label>
                                    <input
                                        type="date"
                                        value={formatDateForInput(startDate)}
                                        min={formatDateForInput(new Date())}
                                        onChange={(e) => handleDateChange('start', e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Drop-off Date</label>
                                    <input
                                        type="date"
                                        value={formatDateForInput(endDate)}
                                        min={formatDateForInput(startDate)}
                                        onChange={(e) => handleDateChange('end', e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-white/10 pt-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Daily Rate</span>
                                    <span>${car.dailyRentalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Duration</span>
                                    <span>{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-white pt-2">
                                    <span>Total Price</span>
                                    <span className="text-blue-500">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    if (!authService.isAuthenticated()) {
                                        router.push('/signin');
                                        return;
                                    }
                                    setIsWizardOpen(true);
                                }}
                                className="flex-1 w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <Calendar size={20} />
                                Book This Vehicle
                            </button>

                            <button className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-bold">
                                <Shield size={24} className="text-gray-400 group-hover:text-white" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <BookingWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                vehicleId={car.id.toString()}
                dailyPrice={car.dailyRentalPrice}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
}
