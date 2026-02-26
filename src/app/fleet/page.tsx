'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Search, SlidersHorizontal, Grid3x3, List, Star, Users, Fuel, Gauge, Calendar, ArrowRight, MapPin, Shield } from 'lucide-react';
import { COLORS } from '@/constants/colours';
import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import vehicleService, { Vehicle, VehicleSearchRequest } from '@/services/vehicleService';
import authService from '@/services/authService';
import BookingWizard from '@/components/booking/BookingWizard';

type ViewMode = 'grid' | 'list';
type SortOption = 'dailyRentalPrice' | 'vehicleModel' | 'averageRating';

function FleetPageContent() {
    const searchParams = useSearchParams();

    // Search State — seed from URL params if coming from the home search widget
    const [startDate, setStartDate] = useState(() => {
        const p = searchParams.get('startDate');
        if (p) return p;
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => {
        const p = searchParams.get('endDate');
        if (p) return p;
        const d = new Date();
        d.setDate(d.getDate() + 4);
        return d.toISOString().split('T')[0];
    });
    const [location, setLocation] = useState(() => searchParams.get('location') ?? '');

    // Data State
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalElements, setTotalElements] = useState(0);

    // Filter/Sort State
    const [sortBy, setSortBy] = useState<SortOption>('dailyRentalPrice');
    const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    // Booking Wizard State
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const fetchVehicles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params: VehicleSearchRequest = {
                startDate,
                endDate,
                location: location || undefined,
                page: 0,
                pageSize: 20,
                sortBy,
                sortDirection
            };

            const response = await vehicleService.getAvailableVehicles(params);
            setVehicles(response.data);
            setTotalElements(response.pagination.total_elements);
        } catch (err: any) {
            console.error("Failed to fetch vehicles", err);
            setError(err.message || 'Failed to load vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate, location, sortBy, sortDirection]);

    // Initial fetch
    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    const router = useRouter();

    const handleBookNow = (vehicle: Vehicle) => {
        if (!authService.isAuthenticated()) {
            router.push('/signin');
            return;
        }
        setSelectedVehicle(vehicle);
        setIsWizardOpen(true);
    };

    return (
        <div className="relative min-h-screen bg-background text-text-primary pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Premium Fleet</h1>
                    <p className="text-text-secondary text-lg">Find the perfect vehicle for your journey</p>
                </motion.div>

                {/* Search and Controls */}
                <div className="glass-premium p-6 rounded-2xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Start Date */}
                        <div className="flex flex-col">
                            <label className="text-sm text-text-secondary mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-surface/60 border border-border rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col">
                            <label className="text-sm text-text-secondary mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-surface/60 border border-border rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Location */}
                        <div className="flex flex-col">
                            <label className="text-sm text-text-secondary mb-1">Location (Optional)</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="City or Airport"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                onClick={fetchVehicles}
                                className="w-full btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-600"
                            >
                                <Search size={20} />
                                Update Search
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                        {/* Sort */}
                        <div className="flex items-center gap-2 w-full lg:w-auto">
                            <span className="text-sm text-text-secondary whitespace-nowrap">Sort by:</span>
                            <select
                                value={`${sortBy}-${sortDirection}`}
                                onChange={(e) => {
                                    const [newSort, newDir] = e.target.value.split('-');
                                    setSortBy(newSort as SortOption);
                                    setSortDirection(newDir as 'ASC' | 'DESC');
                                }}
                                className="bg-surface/60 border border-border rounded-xl px-4 py-2 text-text-primary focus:border-primary focus:outline-none transition-colors text-sm w-full"
                            >
                                <option value="dailyRentalPrice-ASC">Price: Low to High</option>
                                <option value="dailyRentalPrice-DESC">Price: High to Low</option>
                                <option value="averageRating-DESC">Rating: High to Low</option>
                                <option value="vehicleModel-ASC">Name: A-Z</option>
                            </select>
                        </div>

                        {/* View Toggle */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface/50 text-text-secondary hover:bg-surface/80'
                                    }`}
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-surface/50 text-text-secondary hover:bg-surface/80'
                                    }`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="text-center py-20">
                        <div className="text-red-500 text-xl font-semibold mb-2">Oops! Something went wrong.</div>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={fetchVehicles}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Results Count */}
                {!loading && !error && (
                    <div className="mb-6 text-text-secondary">
                        Showing {vehicles.length} of {totalElements} vehicles
                    </div>
                )}

                {/* Cars Grid/List */}
                {!loading && !error && (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                        {vehicles.map((car, i) => (
                            <motion.div
                                key={car.id}
                                className="glass-premium rounded-2xl overflow-hidden hover:bg-white/10 dark:hover:bg-white/10 transition-all border border-transparent hover:border-blue-500/30"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {viewMode === 'grid' ? (
                                    // Grid View
                                    <>
                                        <div className="relative h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {car.colorImages && car.colorImages.length > 0 ? (
                                                <img
                                                    src={car.colorImages[0].imageUrl}
                                                    alt={`${car.vehicleMakeName} ${car.vehicleModel}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Shield size={64} className="text-gray-400/50" />
                                            )}

                                            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                {car.vehicleYear}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{car.bodyTypeName}</div>
                                                    <Link href={`/fleet/${car.id}`} className="hover:text-blue-500 transition-colors">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.vehicleMakeName} {car.vehicleModel}</h3>
                                                    </Link>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={16} fill={COLORS.primary} className="text-blue-500" />
                                                    <span className="font-bold text-gray-900 dark:text-white">{car.averageRating || 'New'}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-text-secondary">
                                                {/* Placeholder for seats/transmision if not in API, usually mapped from body type or description if needed */}
                                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                    <MapPin size={14} />
                                                    <span className="truncate">{car.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-gray-300 dark:border-gray-700">
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Daily Rate</div>
                                                    <div className="text-2xl font-bold text-blue-500">${car.dailyRentalPrice}<span className="text-sm text-gray-500 dark:text-gray-400">/day</span></div>
                                                </div>
                                                <button
                                                    onClick={() => handleBookNow(car)}
                                                    className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                                                >
                                                    Book Now
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // List View
                                    <div className="flex flex-col md:flex-row gap-6 p-6">
                                        <div className="w-full md:w-64 h-40 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {car.colorImages && car.colorImages.length > 0 ? (
                                                <img
                                                    src={car.colorImages[0].imageUrl}
                                                    alt={`${car.vehicleMakeName} ${car.vehicleModel}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Shield size={64} className="text-gray-400/50" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{car.bodyTypeName} • {car.vehicleYear}</div>
                                                    <Link href={`/fleet/${car.id}`} className="hover:text-blue-500 transition-colors">
                                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{car.vehicleMakeName} {car.vehicleModel}</h3>
                                                    </Link>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={16} fill={COLORS.primary} className="text-blue-500" />
                                                    <span className="font-bold text-gray-900 dark:text-white">{car.averageRating || 'New'}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-6 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    {car.location}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{car.description}</p>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Daily Rate</div>
                                                    <div className="text-3xl font-bold text-blue-500">${car.dailyRentalPrice}<span className="text-sm text-gray-500 dark:text-gray-400">/day</span></div>
                                                </div>
                                                <button
                                                    onClick={() => handleBookNow(car)}
                                                    className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                                                >
                                                    Book Now
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No Results and Loaded */}
                {!loading && !error && vehicles.length === 0 && (
                    <div className="glass-premium p-12 rounded-2xl text-center">
                        <Shield size={64} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your dates or location</p>
                    </div>
                )}
            </div>

            {selectedVehicle && (
                <BookingWizard
                    isOpen={isWizardOpen}
                    onClose={() => setIsWizardOpen(false)}
                    vehicleId={selectedVehicle.id.toString()}
                    dailyPrice={selectedVehicle.dailyRentalPrice}
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                />
            )}
        </div>
    );
}

export default function FleetPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center py-20 bg-black min-h-screen text-white pt-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        }>
            <FleetPageContent />
        </Suspense>
    );
}
