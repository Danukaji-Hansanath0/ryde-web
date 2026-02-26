const baseUrl = 'https://api.rydeflexi.com';

(async () => {
    try {
        console.log('--- Finding a valid vehicle ---');
        // Get a vehicle first
        const dateStr = new Date().toISOString().split('T')[0];
        const searchUrl = `${baseUrl}/api/vehicles/search/available?startDate=${dateStr}&endDate=${dateStr}`;
        const searchRes = await fetch(searchUrl);
        if (!searchRes.ok) {
            console.error('Failed to search vehicles', searchRes.status);
            return;
        }
        const searchData = await searchRes.json();
        const vehicle = searchData.data && searchData.data[0];

        if (!vehicle) {
            console.error('No vehicles found to test with');
            return;
        }

        const vehicleId = vehicle.id;
        const carOwnerId = vehicle.carOwnerId;
        // Note: carOwnerVehicleId might be different from vehicle.id, but usually related. 
        // In the schema "carOwnerVehicleId" is a field on Equipment.

        console.log(`Testing with Vehicle ID: ${vehicleId}, CarOwner ID: ${carOwnerId}`);

        const endpoints = [
            `/api/public/vehicles/${vehicleId}/equipments`, // Current
            `/api/owner-vehicles-equipments/${vehicleId}`, // User suggested?
            `/api/owner-vehicles-equipments/vehicle/${vehicleId}`, // Guess 1
            `/api/owner-vehicles-equipments/car-owner-vehicle/${vehicleId}`, // Guess 2
            `/api/owner-vehicles-equipments/car-owner/${carOwnerId}`, // Guess 3 (like insurances)
            `/api/owner-vehicles-equipments?carOwnerVehicleId=${vehicleId}`, // Query param
        ];

        for (const ep of endpoints) {
            const url = `${baseUrl}${ep}`;
            try {
                console.log(`\nFetching ${url}...`);
                const res = await fetch(url);
                console.log(`Status: ${res.status}`);
                if (res.ok) {
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('json')) {
                        const data = await res.json();
                        const isArray = Array.isArray(data);
                        console.log(`Result: ${isArray ? 'Array' : 'Object'}`);
                        if (isArray) console.log(`Count: ${data.length}`);
                        else console.log('Keys:', Object.keys(data));
                    } else {
                        console.log('Result: Not JSON');
                    }
                }
            } catch (e) {
                console.log(`Error: ${e.message}`);
            }
        }

    } catch (e) {
        console.error(e);
    }
})();
