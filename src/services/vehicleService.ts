const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rydeflexi.com';
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || 'https://cdn.orysone.com';

export interface VehicleImage {
    colorId: number;
    colorName: string;
    colorCode: string;
    colorHexCode: string;
    imageUrl: string;
    thumbnailUrl: string;
}

export interface VehicleEquipment {
    equipmentId: number;
    equipmentName: string;
    description: string;
    category: string;
    basePrice: number;
    fullPrice: number;
    isAvailable: boolean;
}

export interface Vehicle {
    id: number;
    carOwnerId: number;
    vehicleMakeName: string;
    vehicleModel: string;
    vehicleYear: number;
    bodyTypeName: string;
    colorName: string;
    description: string;
    ownerName: string;
    ownerEmail: string;
    dailyRentalPrice: number;
    hourlyRentalPrice: number;
    weeklyRentalPrice: number;
    monthlyRentalPrice: number;
    location: string;
    availabilityStatus: string;
    availableFrom: string;
    availableUntil: string;
    deliveryFee: number;
    deliveryFeeRequired: boolean;
    isActive: boolean;
    totalRentals: number;
    averageRating: number;
    equipmentList: VehicleEquipment[];
    colorImages: VehicleImage[];
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    current_page: number;
    page_size: number;
    total_elements: number;
    total_pages: number;
    number_of_elements: number;
    has_next: boolean;
    has_previous: boolean;
    is_first: boolean;
    is_last: boolean;
}

export interface VehicleSearchResponse {
    pagination: Pagination;
    data: Vehicle[];
}

export interface VehicleSearchRequest {
    startDate: string;
    endDate: string;
    location?: string;
    pickupLocation?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
}


export interface Insurance {
    id: number;
    ownerId: number;
    ownerName: string;
    insuranceId: number;
    insuranceType: string;
    insuranceName: string;
    insuranceDescription: string;
    coveragePoints: string[];
    dailyPrice: number;
    weeklyPrice: number;
    monthlyPrice: number;
    isIncluded: boolean;
    isActive: boolean;
    excessAmount: number | null;
    depositAmount: number | null;
    ownerNotes: string | null;
    createdAt: string;
    updatedAt: string;
}

const DEFAULT_BASIC_INSURANCE: Insurance = {
    id: 0,
    ownerId: 0,
    ownerName: '',
    insuranceId: 1,
    insuranceType: 'BASIC',
    insuranceName: 'Basic Protection',
    insuranceDescription: 'Basic liability coverage for your rental',
    coveragePoints: ['Third party liability', 'Theft protection', 'Fire damage'],
    dailyPrice: 0,
    weeklyPrice: 0,
    monthlyPrice: 0,
    isIncluded: true,
    isActive: true,
    excessAmount: null,
    depositAmount: null,
    ownerNotes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

export interface Equipment {
    id: number;
    carOwnerVehicleId: number;
    vehicleDisplayName: string;
    extraEquipmentId: number;
    equipmentName: string;
    equipmentCategory: string; // e.g., 'SAFETY'
    basePrice: number;
    fullPrice: number;
    basePriceWithCommission: number;
    fullPriceWithCommission: number;
    commissionPercentage: number;
    baseCommissionAmount: number;
    fullCommissionAmount: number;
    availableQuantity: number;
    maxQuantity: number;
    isAvailable: boolean;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

import authService from './authService';

class VehicleService {
    /**
     * Helper for authenticated requests with retry on 401
     */
    private async fetchWithRetry(url: string, options: RequestInit = {}): Promise<Response> {
        let token = authService.getAccessToken();
        const headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        let response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            console.log('401 Unauthorized received, attempting token refresh...');
            // Try to refresh token
            const newToken = await authService.refreshAccessToken();
            if (newToken) {
                console.log('Token refreshed successfully, retrying request...');
                // Retry once with new token
                const retryHeaders = {
                    ...headers,
                    'Authorization': `Bearer ${newToken}`
                };
                response = await fetch(url, { ...options, headers: retryHeaders });
            } else {
                console.error('Token refresh failed or returned null');
            }
        }

        return response;
    }

    /**
     * Search available vehicles
     */
    async getAvailableVehicles(params: VehicleSearchRequest): Promise<VehicleSearchResponse> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('startDate', params.startDate);
            queryParams.append('endDate', params.endDate);

            if (params.location) queryParams.append('location', params.location);
            if (params.pickupLocation) queryParams.append('pickupLocation', params.pickupLocation);
            if (params.page !== undefined) queryParams.append('page', params.page.toString());
            if (params.pageSize !== undefined) queryParams.append('pageSize', params.pageSize.toString());
            if (params.sortBy) queryParams.append('sortBy', params.sortBy);
            if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);

            // Searching is usually public, but we can use fetchWithRetry if we want consistent logging/behavior
            // For now let's keep it simple or use it to be safe
            const response = await fetch(`${API_BASE_URL}/api/vehicles/search/available?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Vehicle search received HTML response:', text);
                throw new Error('Server returned an HTML error instead of JSON. Please try again later.');
            }

            let data;
            const text = await response.text();
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error('Failed to parse vehicle search response:', text);
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Vehicle search error:', error);
            throw error;
        }
    }

    /**
     * Get vehicle details by ID
     */
    async getVehicleDetails(id: number): Promise<Vehicle> {
        try {
            // Reverting to /api/vehicles/{id} as /api/public/vehicles/{id} causes 500 error.
            // Using fetchWithRetry to ensure auth headers are sent, hoping this exposes carOwnerId.
            const response = await this.fetchWithRetry(`${API_BASE_URL}/api/vehicles/${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to fetch vehicle details: ${response.status} ${text}`);
            }

            const vehicle = await response.json();

            // If carOwnerId is missing, try to find it via search API (as a fallback workaround)
            if (!vehicle.carOwnerId) {
                console.warn(`Vehicle ${id} response missing carOwnerId, attempting fallback search...`);
                try {
                    // Search for this specific vehicle by some criteria or just recent avail
                    // Since we can't search by ID directly in available endpoint usually, we might have to rely on
                    // the fact that this method is called in context where we might have dates.
                    // BUT, for now, let's try a broad search or just use the ID if the search supports it?
                    // The available endpoint takes dates. Let's try to fetch "today" availability to see if it pops up?
                    // Actually, simpler: The user might be browsing. 

                    // Let's try to just fetch the available vehicles and find it? Inefficient but might work for now.
                    // Better verify if there's a specific endpoint.
                    // The debug script showed /api/vehicles/search/available returns it.
                    // Let's try to call getAvailableVehicles with dummy dates?
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    const searchRes = await this.getAvailableVehicles({
                        startDate: today.toISOString().split('T')[0],
                        endDate: tomorrow.toISOString().split('T')[0],
                        page: 0,
                        pageSize: 100 // Hope it's in the first page... this is brittle but necessary given API constraints
                    });

                    const found = searchRes.data.find(v => v.id === vehicle.id);
                    if (found && found.carOwnerId) {
                        console.log(`Found carOwnerId ${found.carOwnerId} via search fallback`);
                        vehicle.carOwnerId = found.carOwnerId;
                    }
                } catch (fallbackErr) {
                    console.error('Fallback search for carOwnerId failed:', fallbackErr);
                }
            }

            if (!vehicle.carOwnerId) {
                console.warn(`Vehicle ${id} response missing carOwnerId. Keys:`, Object.keys(vehicle));
            }
            return vehicle;
        } catch (error) {
            console.error('Get vehicle details error:', error);
            throw error;
        }
    }

    /**
     * Get owner insurances by ID (Fetching via Owner ID)
     */
    async getOwnerInsurances(vehicleId: number, ownerName?: string): Promise<Insurance[]> {
        try {
            // First, get the vehicle details to find the owner ID
            const vehicle = await this.getVehicleDetails(vehicleId);
            if (!vehicle || !vehicle.carOwnerId) {
                console.error('Vehicle or carOwnerId not found for vehicle:', vehicleId);
                return [{ ...DEFAULT_BASIC_INSURANCE, ownerId: 0, ownerName: vehicle?.ownerName || '' }];
            }

            const ownerId = vehicle.carOwnerId;
            const ownerNameStr = vehicle.ownerName || ownerName || '';
            console.log(`Fetching insurances for owner ${ownerId} (vehicle ${vehicleId})`);

            // Use the new endpoint: /api/owner-insurances/owner/{ownerId}
            const response = await this.fetchWithRetry(`${API_BASE_URL}/api/owner-insurances/owner/${ownerId}`, {
                method: 'GET',
            });

            if (response.status === 404 || response.status === 204) {
                console.log(`No insurances found for owner ${ownerId}, returning default BASIC protection`);
                return [{ ...DEFAULT_BASIC_INSURANCE, ownerId, ownerName: ownerNameStr }];
            }

            const text = await response.text();

            const url = `${API_BASE_URL}/api/owner-insurances/owner/${ownerId}`;
            // Check if response is XML (error response)
            if (text.trim().startsWith('<')) {
                console.warn(`Insurance endpoint (${url}) returned XML error, returning default BASIC protection`);
                return [{ ...DEFAULT_BASIC_INSURANCE, ownerId, ownerName: ownerNameStr }];
            }

            let data: any = [];

            try {
                data = text ? JSON.parse(text) : [];
            } catch (e) {
                console.error('Failed to parse JSON response:', text);
                if (!response.ok) {
                    throw new Error(`Server returned an error (${response.status}). Please try again later.`);
                }
                return [{ ...DEFAULT_BASIC_INSURANCE, ownerId, ownerName: ownerNameStr }];
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            const insurances = Array.isArray(data) ? data : [data];
            
            // If no insurances returned, provide default BASIC protection
            if (insurances.length === 0) {
                console.log(`Empty insurances array for owner ${ownerId}, returning default BASIC protection`);
                return [{ ...DEFAULT_BASIC_INSURANCE, ownerId, ownerName: ownerNameStr }];
            }

            return insurances;
        } catch (error) {
            console.error('Get owner insurances error:', error);
            // Return default BASIC protection on error
            const vehicle = await this.getVehicleDetails(vehicleId).catch(() => null);
            return [{ ...DEFAULT_BASIC_INSURANCE, ownerId: vehicle?.carOwnerId || 0, ownerName: vehicle?.ownerName || '' }];
        }
    }

    /**
     * Get owner vehicle equipments by ID
     */
    async getOwnerVehicleEquipments(vehicleId: number): Promise<Equipment[]> {
        try {
            // First, get the vehicle details to find the owner ID
            const vehicle = await this.getVehicleDetails(vehicleId);
            if (!vehicle || !vehicle.carOwnerId) {
                console.warn('Vehicle or carOwnerId not found for vehicle:', vehicleId);
                return [];
            }

            const ownerId = vehicle.carOwnerId;
            console.log(`Fetching equipments for owner ${ownerId} (vehicle ${vehicleId})`);

            // Use the endpoint: /api/owner-extra-equipments/owner/{ownerId}
            const response = await this.fetchWithRetry(`${API_BASE_URL}/api/owner-extra-equipments/owner/${ownerId}`, {
                method: 'GET',
            });

            if (response.status === 404 || response.status === 204) {
                console.log(`No equipments found for vehicle ${vehicleId}`);
                return [];
            }

            const text = await response.text();

            const url = `${API_BASE_URL}/api/owner-extra-equipments/owner/${ownerId}`;
            // Check if response is XML (error response)
            if (text.trim().startsWith('<')) {
                console.warn(`Equipment endpoint (${url}) returned XML error, continuing without equipments`);
                // Don't throw - just return empty array so booking can continue
                return [];
            }

            // If server error, log and return empty (don't block booking)
            if (response.status >= 500) {
                console.warn(`Server error fetching equipments for vehicle ${vehicleId}: ${response.status}`);
                return [];
            }

            let data: any = [];

            try {
                data = text ? JSON.parse(text) : [];
            } catch (e) {
                console.warn('Failed to parse equipment response, continuing without equipments');
                return [];
            }

            if (!response.ok) {
                console.warn(`Equipment fetch returned ${response.status}, continuing without equipments`);
                return [];
            }

            const allEquipments = Array.isArray(data) ? data : [data];

            // Map API response to Equipment interface (API returns owner-level equipments without carOwnerVehicleId)
            const mappedEquipments: Equipment[] = allEquipments.map((e: any) => ({
                id: e.id,
                carOwnerVehicleId: vehicleId,
                vehicleDisplayName: `${vehicle.vehicleMakeName} ${vehicle.vehicleModel}` || '',
                extraEquipmentId: e.extraEquipmentId,
                equipmentName: e.equipmentName,
                equipmentCategory: e.equipmentCategory,
                basePrice: e.basePrice,
                fullPrice: e.fullPrice,
                basePriceWithCommission: e.basePriceWithCommission,
                fullPriceWithCommission: e.fullPriceWithCommission,
                commissionPercentage: e.commissionPercentage,
                baseCommissionAmount: e.basePrice * (e.commissionPercentage / 100),
                fullCommissionAmount: e.fullPrice * (e.commissionPercentage / 100),
                availableQuantity: 10,
                maxQuantity: 10,
                isAvailable: e.isAvailable,
                notes: e.notes || '',
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
            }));

            // Filter to only show available equipments for this vehicle
            return mappedEquipments.filter((e: Equipment) => e.isAvailable);

        } catch (error) {
            // Log but don't throw - equipments are optional
            console.warn('Get owner vehicle equipments error (non-fatal):', error);
            return [];
        }
    }
}

export function getFullImageUrl(partialUrl: string | undefined | null): string {
    if (!partialUrl) return '';
    if (partialUrl.startsWith('http://') || partialUrl.startsWith('https://')) {
        return partialUrl;
    }
    return `${CDN_BASE_URL}/${partialUrl}`;
}

export { CDN_BASE_URL };
export default new VehicleService();
