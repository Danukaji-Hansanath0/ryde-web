import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rydeflexi.com';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
            const text = await response.text();
            console.error('Backend returned HTML:', text);
            return NextResponse.json(
                { success: false, message: 'Backend API returned HTML error', details: text.substring(0, 200) },
                { status: response.status || 500 }
            );
        }

        const text = await response.text();
        let data;
        try {
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
                { success: false, message: data.message || 'Login failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Invalid email or password' },
            { status: 500 }
        );
    }
}
