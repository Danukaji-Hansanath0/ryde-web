const vehicleId = 1;
const baseUrl = 'https://api.rydeflexi.com';

const endpoints = [
    `/api/vehicles/${vehicleId}/insurances`,
    `/api/insurances/vehicle/${vehicleId}`,
    `/api/public/vehicles/${vehicleId}/insurances`,
    `/api/owner-insurances/${vehicleId}`, // The failing one
    `/api/bookings/options/${vehicleId}`
];

(async () => {
    console.log(`Testing insurance endpoints for vehicle ${vehicleId} at ${baseUrl}`);
    for (const endpoint of endpoints) {
        try {
            const url = baseUrl + endpoint;
            console.log('Fetching', url);
            const res = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const contentType = res.headers.get('content-type');
            console.log(`${endpoint}: Status ${res.status}, Type ${contentType}`);
            if (res.status === 200) {
                const text = await res.text();
                console.log('--- SUCCESS CONTENT ---');
                console.log(text.substring(0, 500));
                console.log('-----------------------');
            }
        } catch (e) {
            console.log(`${endpoint}: Error ${e.message}`);
        }
    }
})();
