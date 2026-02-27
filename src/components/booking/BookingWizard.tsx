'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Plus, Minus, Info, Check, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import vehicleService, { Insurance, Equipment } from '@/services/vehicleService';
import bookingService, { BookingRequest } from '@/services/bookingService';
import authService from '@/services/authService';
import Link from 'next/link';

const PAYMENT_BASE_URL = 'https://api.rydeflexi.com/';

interface BookingWizardProps {
    isOpen: boolean;
    onClose: () => void;
    vehicleId: string; // The ID from URL is string, but services expect number. I'll convert.
    dailyPrice: number;
    startDate: Date;
    endDate: Date;
}

type Step = 'insurance' | 'equipment' | 'address' | 'summary';

export default function BookingWizard({ isOpen, onClose, vehicleId, dailyPrice, startDate, endDate }: BookingWizardProps) {
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);
    const [step, setStep] = useState<Step>('insurance');
    const [insurances, setInsurances] = useState<Insurance[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
    const [selectedEquipments, setSelectedEquipments] = useState<{ [id: number]: number }>({}); // equipmentId -> quantity
    const [pickupAddress, setPickupAddress] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [sameAsPickup, setSameAsPickup] = useState(true);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const vehicleIdNum = parseInt(vehicleId);

    // Sync with props if they change while wizard is open
    useEffect(() => {
        setLocalStartDate(startDate);
        setLocalEndDate(endDate);
    }, [startDate, endDate]);

    // Calculate rental days
    const diffTime = Math.abs(localEndDate.getTime() - localStartDate.getTime());
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Default to 1 day if same day

    // Listen for auth changes
    useEffect(() => {
        const checkAuth = () => {
            if (!authService.isAuthenticated() && isOpen) {
                setError("Your session has expired. Please sign in again to continue.");
            }
        };
        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, [isOpen]);

    // Restored insurance fetching as per user request
    useEffect(() => {
        if (isOpen && vehicleIdNum && authService.isAuthenticated()) {
            setLoading(true);
            setError(null);

            Promise.all([
                vehicleService.getOwnerInsurances(vehicleIdNum),
                vehicleService.getOwnerVehicleEquipments(vehicleIdNum)
            ])
                .then(([insData, equipData]) => {
                    setInsurances(insData);
                    const defaultInsurance = insData.find(i => i.isIncluded);
                    if (defaultInsurance) setSelectedInsurance(defaultInsurance);

                    setEquipments(equipData);
                })
                .catch(err => {
                    console.error("Failed to load booking options", err);
                    if (err.message?.includes('401')) {
                        setError("Session expired. Please sign in again.");
                    } else {
                        console.error("Failed to load options", err);
                        // setError("Failed to load options. Please try again.");
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, vehicleIdNum]);


    const handleEquipmentChange = (id: number, delta: number, max: number) => {
        const safeMax = max || 99;
        setSelectedEquipments(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, Math.min(safeMax, current + delta));
            if (next === 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: next };
        });
    };

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
            setLocalStartDate(newDate);
            if (newDate >= localEndDate) {
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setLocalEndDate(nextDay);
            }
        } else {
            if (newDate <= localStartDate) {
                const prevDay = new Date(newDate);
                prevDay.setDate(prevDay.getDate() - 1);
                setLocalStartDate(prevDay);
            }
            setLocalEndDate(newDate);
        }
    };

    const calculateTotal = () => {
        let total = dailyPrice * rentalDays;

        if (selectedInsurance) {
            total += selectedInsurance.dailyPrice * rentalDays;
        }

        Object.entries(selectedEquipments).forEach(([idStr, quantity]) => {
            const id = parseInt(idStr);
            const equip = equipments.find(e => (e.id || e.extraEquipmentId) === id);
            if (equip) {
                total += (equip.fullPriceWithCommission || equip.fullPrice || 0) * (quantity as number);
            }
        });

        return total;
    };

    const handlePayment = async () => {
        if (!selectedInsurance) {
            setError("Please select an insurance option.");
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const equipmentList = Object.entries(selectedEquipments).map(([id, qty]) => {
                const idNum = parseInt(id);
                const equip = equipments.find(e => (e.id || e.extraEquipmentId) === idNum);
                return {
                    equipmentId: equip?.extraEquipmentId || equip?.id || idNum,
                    quantity: qty as number
                };
            });

            const bookingData: BookingRequest = {
                vehicleId: vehicleIdNum,
                startDate: localStartDate.toISOString(),
                endDate: localEndDate.toISOString(),
                rentalDuration: `${rentalDays} Days`,
                insuranceId: selectedInsurance.id,
                pickupLocation: pickupAddress || "Default Pickup",
                dropoffLocation: sameAsPickup ? (pickupAddress || "Default Pickup") : (dropoffAddress || "Default Dropoff"),
                equipmentList: equipmentList,
                specialRequests: ""
            };

            const response = await bookingService.createBooking(bookingData);

            console.log('Payment API Response:', response);
            console.log('Response type:', typeof response);
            console.log('Response keys:', response ? Object.keys(response) : 'null');

            // Try to extract URL from various possible field names
            let redirectUrl: any = null;

            if (response) {
                // Check common URL field names
                redirectUrl = response.url ||
                    response.redirectUrl ||
                    response.checkoutUrl ||
                    response.paymentUrl ||
                    response.phpUrl ||
                    response.additionalProp1 ||
                    response.additionalProp2 ||
                    response.additionalProp3;

                // If response itself is a string URL
                if (typeof response === 'string' && response.startsWith('http')) {
                    redirectUrl = response;
                }
            }

            console.log('Extracted redirect URL/raw value:', redirectUrl);

            let finalUrl: string | null = null;
            const base = PAYMENT_BASE_URL.replace(/\/+$/, '');

            if (redirectUrl && typeof redirectUrl === 'string') {
                if (redirectUrl.startsWith('http')) {
                    try {
                        const parsed = new URL(redirectUrl);
                        const pathAndQuery = `${parsed.pathname}${parsed.search}`;
                        finalUrl = `${base}${pathAndQuery}`;
                    } catch {
                        finalUrl = base;
                    }
                } else if (redirectUrl.startsWith('/')) {
                    finalUrl = `${base}${redirectUrl}`;
                } else if (redirectUrl.startsWith('?') || redirectUrl.startsWith('&')) {
                    finalUrl = `${base}${redirectUrl}`;
                } else {
                    finalUrl = `${base}?${redirectUrl}`;
                }
            } else if (redirectUrl && typeof redirectUrl === 'object') {
                const query = new URLSearchParams(redirectUrl as Record<string, string>).toString();
                finalUrl = query ? `${base}?${query}` : base;
            } else if (!redirectUrl) {
                finalUrl = base;
            }

            if (finalUrl && typeof finalUrl === 'string' && finalUrl.startsWith('http')) {
                console.log('Redirecting to:', finalUrl);
                window.location.href = finalUrl;
            } else {
                console.error('No valid redirect URL found in response');
                setError("Payment URL not received. Please try again.");
            }

        } catch (err: any) {
            console.error(err);
            if (err.message?.includes('401')) {
                setError("Session expired. Please sign in again.");
            } else {
                setError(err.message || "Payment initiation failed.");
            }
        } finally {
            setProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Complete Booking</h2>
                            <p className="text-gray-400 text-sm">Step {step === 'insurance' ? 1 : step === 'equipment' ? 2 : step === 'address' ? 3 : 4} of 4</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {error && (
                            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex flex-col gap-3">
                                <span>{error}</span>
                                {(error.includes("Session expired") || error.includes("session has expired")) && (
                                    <Link href="/signin">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold w-fit hover:bg-blue-500 transition-colors">
                                            Sign In
                                        </button>
                                    </Link>
                                )}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <>
                                {/* Step 1: Insurance */}
                                {step === 'insurance' && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white mb-4">Select Insurance</h3>
                                        <div className="grid gap-4">
                                            {insurances.map(ins => (
                                                <div
                                                    key={ins.id}
                                                    onClick={() => setSelectedInsurance(ins)}
                                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedInsurance?.id === ins.id
                                                        ? 'bg-blue-600/20 border-blue-500'
                                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-white">{ins.insuranceName}</h4>
                                                            {ins.isIncluded && (
                                                                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Included</span>
                                                            )}
                                                        </div>
                                                        <div className="text-blue-400 font-bold">
                                                            ${ins.dailyPrice}/day
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-2">{ins.insuranceDescription}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ins.coveragePoints.map((point, i) => (
                                                            <div key={i} className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                                <Check size={12} className="text-blue-500" />
                                                                {point}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 'equipment' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end mb-2">
                                            <h3 className="text-xl font-bold text-white">Add Extras</h3>
                                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Enhance your journey</span>
                                        </div>

                                        {equipments.length === 0 ? (
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Info className="text-gray-500" size={32} />
                                                </div>
                                                <h4 className="text-white font-bold mb-2">No Extras Available</h4>
                                                <p className="text-gray-400 text-sm">This vehicle doesn't have any additional equipment options at the moment.</p>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                {equipments.map(item => {
                                                    const itemId = item.id || item.extraEquipmentId;
                                                    const isSelected = !!selectedEquipments[itemId];
                                                    const quantity = selectedEquipments[itemId] || 0;
                                                    const maxQty = item.maxQuantity || 99;
                                                    const price = item.fullPriceWithCommission || item.fullPrice || 0;

                                                    return (
                                                        <motion.div
                                                            key={itemId}
                                                            whileHover={{ scale: 1.01 }}
                                                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${isSelected
                                                                ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-gray-500'
                                                                    }`}>
                                                                    <Plus size={24} />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-white text-lg">{item.equipmentName}</h4>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-blue-400 font-bold">${price.toFixed(2)}</span>
                                                                        <span className="text-gray-500 text-xs uppercase tracking-tighter">Per Trip</span>
                                                                    </div>
                                                                    {item.notes && <p className="text-xs text-gray-500 mt-1 italic">{item.notes}</p>}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                {isSelected ? (
                                                                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-1 px-2">
                                                                        <button
                                                                            onClick={() => handleEquipmentChange(itemId, -1, maxQty)}
                                                                            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                                        >
                                                                            <Minus size={16} />
                                                                        </button>
                                                                        <span className="w-6 text-center font-bold text-white">{quantity}</span>
                                                                        <button
                                                                            onClick={() => handleEquipmentChange(itemId, 1, maxQty)}
                                                                            disabled={quantity >= maxQty}
                                                                            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                                                                        >
                                                                            <Plus size={16} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleEquipmentChange(itemId, 1, maxQty)}
                                                                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold transition-all hover:border-white/30"
                                                                    >
                                                                        Add
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Step 3: Address */}
                                {step === 'address' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Delivery Details</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Pickup Address</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                                        <MapPin size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={pickupAddress}
                                                        onChange={(e) => setPickupAddress(e.target.value)}
                                                        placeholder="Enter pickup location"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 py-2">
                                                <button
                                                    onClick={() => setSameAsPickup(!sameAsPickup)}
                                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${sameAsPickup ? 'bg-blue-600 border-blue-600' : 'border-white/20'
                                                        }`}
                                                >
                                                    {sameAsPickup && <Check size={14} className="text-white" />}
                                                </button>
                                                <span className="text-sm text-gray-400">Return to same location</span>
                                            </div>

                                            {!sameAsPickup && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Drop-off Address</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                                            <MapPin size={18} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={dropoffAddress}
                                                            onChange={(e) => setDropoffAddress(e.target.value)}
                                                            placeholder="Enter drop-off location"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Summary */}
                                {step === 'summary' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>

                                        <div className="bg-white/5 rounded-xl p-4 space-y-4">
                                            {/* Rental Details */}
                                            <div className="border-b border-white/10 pb-4">
                                                <div className="flex justify-between text-sm mb-4 gap-4">
                                                    <div className="flex-1">
                                                        <label className="block text-xs text-gray-500 mb-1 uppercase font-bold">Pickup</label>
                                                        <input
                                                            type="date"
                                                            value={formatDateForInput(localStartDate)}
                                                            min={formatDateForInput(new Date())}
                                                            onChange={(e) => handleDateChange('start', e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-xs text-gray-500 mb-1 uppercase font-bold">Drop-off</label>
                                                        <input
                                                            type="date"
                                                            value={formatDateForInput(localEndDate)}
                                                            min={formatDateForInput(localStartDate)}
                                                            onChange={(e) => handleDateChange('end', e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Duration</span>
                                                    <span>{rentalDays} Days</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Vehicle Total</span>
                                                    <span>${(dailyPrice * rentalDays).toFixed(2)}</span>
                                                </div>
                                            </div>

                                            {/* Location Details */}
                                            <div className="border-b border-white/10 pb-4">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Pickup</span>
                                                    <span className="text-right max-w-[200px] truncate">{pickupAddress || "Not specified"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Drop-off</span>
                                                    <span className="text-right max-w-[200px] truncate">
                                                        {sameAsPickup ? (pickupAddress || "Not specified") : (dropoffAddress || "Not specified")}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Insurance */}
                                            {selectedInsurance && (
                                                <div className="border-b border-white/10 pb-4">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-400">Insurance ({selectedInsurance.insuranceName})</span>
                                                        <span>${(selectedInsurance.dailyPrice * rentalDays).toFixed(2)}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ${selectedInsurance.dailyPrice}/day x {rentalDays} days
                                                    </div>
                                                </div>
                                            )}

                                            {/* Equipment */}
                                            {Object.keys(selectedEquipments).length > 0 && (
                                                <div className="border-b border-white/10 pb-4">
                                                    <span className="text-gray-400 text-sm block mb-2">Extras</span>
                                                    {Object.entries(selectedEquipments).map(([idStr, qty]) => {
                                                        const item = equipments.find(e => (e.id || e.extraEquipmentId) === parseInt(idStr));
                                                        if (!item) return null;
                                                        return (
                                                            <div key={idStr} className="flex justify-between text-sm mb-1">
                                                                <span>{item.equipmentName} (x{qty as number})</span>
                                                                <span>${((item.fullPriceWithCommission || item.fullPrice || 0) * (qty as number)).toFixed(2)}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Total */}
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-xl font-bold text-white">Total</span>
                                                <span className="text-2xl font-bold text-blue-500">${calculateTotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer / Actions */}
                    <div className="p-6 border-t border-white/10 bg-[#0f1115] flex justify-between items-center gap-4">
                        {step !== 'insurance' ? (
                            <button
                                onClick={() => {
                                    if (step === 'summary') setStep('address');
                                    else if (step === 'address') setStep('equipment');
                                    else setStep('insurance');
                                }}
                                className="px-6 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {step === 'summary' ? (
                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay Now
                                        <Check size={18} />
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (step === 'insurance') setStep('equipment');
                                    else if (step === 'equipment') setStep('address');
                                    else setStep('summary');
                                }}
                                disabled={
                                    (step === 'insurance' && !selectedInsurance) ||
                                    (step === 'address' && !pickupAddress) ||
                                    (step === 'address' && !sameAsPickup && !dropoffAddress)
                                }
                                className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next Step
                                <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
