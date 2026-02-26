const vehicleId = 1;
const baseUrl = 'https://api.rydeflexi.com';

const endpoints = [
    `/api/vehicles/${vehicleId}`,
    `/api/public/vehicles/${vehicleId}`,
    `/api/vehicle/${vehicleId}`
];

(async () => {
    console.log(`Testing vehicle details endpoints for ID ${vehicleId} at ${baseUrl}`);
    for (const endpoint of endpoints) {
        try {
            const url = baseUrl + endpoint;
            console.log('Fetching', url);
            const res = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(`${endpoint}: Status ${res.status}`);
            if (res.status === 200) {
                const text = await res.text();
                console.log('--- CONTENT (First 200 chars) ---');
                console.log(text.substring(0, 200));
                console.log('---------------------------------');
            }
        } catch (e) {
            console.log(`${endpoint}: Error ${e.message}`);
        }
    }
})();
