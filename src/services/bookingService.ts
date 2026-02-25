const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rydeflexi.com';

export interface BookingRequest {
    vehicleId: number;
    startDate: string;
    endDate: string;
    rentalDuration?: string; // Optional as it might be calculated backend side or just a string representation
    insuranceId: number;
    pickupLocation: string;
    dropoffLocation: string;
    equipmentList: {
        equipmentId: number;
        quantity: number;
    }[];
    specialRequests?: string;
}

export interface BookingResponse {
    additionalProp1?: string;
    additionalProp2?: string;
    additionalProp3?: string;
    // The user request example shows additionalProps, but the description says "returns the PHP API URL".
    // I'll assume it might return a URL string or an object containing it.
    // Based on "returns the PHP API URL for direct redirection", it might be a simple string or a JSON with a redirectUrl field.
    // For now, I will type it loosely to inspect the response or adjust based on actual API behavior if known.
    // However, the example schema shows "additionalProp1", which is usually swagger auto-gen for "any object".
    // I'll assume it returns a JSON object. I'll add a generic type or specific if I find more info.
    // Let's assume it returns { url: string } or similar, OR just the response the user pasted.
    // I'll use `any` for the response data for now to be safe and type it properly after verifying or if I can infer it better.
    [key: string]: any;
}

import authService from './authService';

class BookingService {
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
            console.log('BookingService: 401 Unauthorized, refreshing token...');
            // Try to refresh token
            const newToken = await authService.refreshAccessToken();
            if (newToken) {
                console.log('BookingService: Token refreshed, retrying...');
                // Retry once with new token
                const retryHeaders = {
                    ...headers,
                    'Authorization': `Bearer ${newToken}`
                };
                response = await fetch(url, { ...options, headers: retryHeaders });
            } else {
                console.error('BookingService: Token refresh failed');
            }
        }

        return response;
    }

    /**
     * Create booking and get PHP redirect URL
     */
    async createBooking(bookingData: BookingRequest): Promise<any> {
        try {
            const response = await this.fetchWithRetry(`${API_BASE_URL}/api/bookings/v2/pay`, {
                method: 'POST',
                body: JSON.stringify(bookingData),
            });

            const text = await response.text();
            let data: any = {};

            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error('Failed to parse JSON response:', text);
                if (!response.ok) {
                    throw new Error(`Server returned an error (${response.status}). Please try again later.`);
                }
                return {};
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Create booking error:', error);
            throw error;
        }
    }
}

export default new BookingService();
