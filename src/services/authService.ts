const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rydeflexi.com';

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export interface Address {
    id: number;
    carOwnerId: number;
    businessName: string;
    addressType: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    isPrimary: boolean;
    isActive: boolean;
    contactPerson: string;
    phoneNumber: string;
    email: string;
    operatingHours: string;
    description: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    isActive: boolean;
    emailVerified: boolean;
    logoUrl: string;
    addresses: Address[];
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Registration received HTML response:', text);
                throw new Error('Server returned an HTML error instead of JSON. Please try again later.');
            }

            let result;
            try {
                result = await response.json();
            } catch (e) {
                const text = await response.text();
                console.error('Failed to parse registration response:', text);
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            // Store tokens in localStorage
            if (result.accessToken) {
                localStorage.setItem('accessToken', result.accessToken);
            }
            if (result.refreshToken) {
                localStorage.setItem('refreshToken', result.refreshToken);
            }

            return result;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Login user
     */
    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Login received HTML response:', text);
                throw new Error('Server returned an HTML error instead of JSON. Please try again later.');
            }

            let result;
            try {
                result = await response.json();
            } catch (e) {
                const text = await response.text();
                console.error('Failed to parse login response:', text);
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            // Store tokens in localStorage
            if (result.accessToken) {
                localStorage.setItem('accessToken', result.accessToken);
            }
            if (result.refreshToken) {
                localStorage.setItem('refreshToken', result.refreshToken);
            }

            console.log('AuthService: Login successful, tokens stored.');
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            // Dispatch event to notify components
            window.dispatchEvent(new Event('auth-change'));
        }
    }


    /**
     * Get user profile
     */
    async getProfile(): Promise<LoginResponse> {
        try {
            const token = this.getAccessToken();
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch('/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Received HTML response:', text);
                throw new Error('Received HTML response instead of JSON. API route might be missing or returning an error page.');
            }

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    this.logout();
                }
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            // Update tokens if present in response (optional, based on API behavior)
            if (result.accessToken) {
                localStorage.setItem('accessToken', result.accessToken);
            }
            if (result.refreshToken) {
                localStorage.setItem('refreshToken', result.refreshToken);
            }

            return result;
        } catch (error) {
            console.error('Get profile error:', error);
            throw error;
        }
    }

    /**
     * Logout user
     */
    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth-change'));
    }

    /**
     * Get access token
     */
    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    /**
     * Get refresh token
     */
    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    /**
     * Refresh access token
     */
    async refreshAccessToken(): Promise<string | null> {
        try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
                return null;
            }

            const response = await fetch(`${API_BASE_URL}/api/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }) // Send in body as well just in case
            });

            const result = await response.json();

            if (!response.ok) {
                // If 400/401, the refresh token is likely expired or invalid
                console.error(`Refresh token failed with status: ${response.status}`);
                if (response.status === 400 || response.status === 401) {
                    this.logout();
                    return null;
                }
                throw new Error(result.error_description || result.message || 'Refresh token failed');
            }

            if (result.accessToken) {
                localStorage.setItem('accessToken', result.accessToken);
            }
            if (result.refreshToken) {
                localStorage.setItem('refreshToken', result.refreshToken);
            }

            return result.accessToken || null;
        } catch (error) {
            // Silently logout on terminal refresh failure to avoid console noise for expected expiration
            this.logout();
            return null;
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
}

export default new AuthService();
