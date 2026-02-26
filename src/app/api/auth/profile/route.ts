import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rydeflexi.com';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
            return NextResponse.json(
                { success: false, message: 'No authorization token provided' },
                { status: 401 }
            );
        }

        console.log(`Proxying profile request to: ${API_BASE_URL}/api/profile`);

        const response = await fetch(`${API_BASE_URL}/api/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
            const text = await response.text();
            console.error('Backend returned HTML:', text);
            return NextResponse.json(
                { success: false, message: 'Backend API returned HTML error (likely 404 or 500) for /api/users/me', details: text.substring(0, 200) },
                { status: response.status || 500 }
            );
        }

        const text = await response.text();
        let data;
        try {
            // Handle empty body (often 204 No Content)
            if (!text || text.trim() === '') {
                data = {};
            } else {
                data = JSON.parse(text);
            }
        } catch (e) {
            console.error('Failed to parse backend response:', text);
            return NextResponse.json(
                { success: false, message: `Invalid JSON response from backend. Content: ${text.substring(0, 100)}` },
                { status: 502 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: data.message || 'Failed to fetch profile' },
                { status: response.status }
            );
        }

        // Adapter: If the backend returns the user object directly, wrap it to match the expected structure
        // The frontend AuthService expects { user: User, ... }
        if (!data.user && (data.id || data.email)) {
            return NextResponse.json({
                success: true,
                message: 'Profile fetched successfully',
                user: data
            }, { status: 200 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Profile API error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
