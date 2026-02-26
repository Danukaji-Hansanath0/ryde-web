const baseUrl = 'https://api.rydeflexi.com';

(async () => {
    try {
        console.log('--- Verifying Equipment Fetching Logic ---');

        // 1. Get a vehicle (simulate getting vehicle details)
        const dateStr = new Date().toISOString().split('T')[0];
        const searchUrl = `${baseUrl}/api/vehicles/search/available?startDate=${dateStr}&endDate=${dateStr}`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        const vehicle = searchData.data && searchData.data[0];

        if (!vehicle) {
            console.error('No vehicles found to test with');
            return;
        }

        console.log(`Step 1: Found Vehicle ${vehicle.id}, Owner: ${vehicle.carOwnerId}`);

        // 2. Fetch equipments for owner
        const equipmentUrl = `${baseUrl}/api/owner-vehicles-equipments/car-owner/${vehicle.carOwnerId}`;
        console.log(`Step 2: Fetching ${equipmentUrl}`);
        const eqRes = await fetch(equipmentUrl);

        if (eqRes.status === 200) {
            const allEquipments = await eqRes.json();
            console.log(`Step 3: Received ${allEquipments.length} equipments for owner`);

            // 3. Filter by vehicle
            const vehicleEquipments = allEquipments.filter(e => e.carOwnerVehicleId === vehicle.id);
            console.log(`Step 4: Filtered to ${vehicleEquipments.length} equipments for vehicle ${vehicle.id}`);

            if (vehicleEquipments.length > 0) {
                console.log('Sample Equipment:', vehicleEquipments[0].equipmentName, 'Price:', vehicleEquipments[0].fullPriceWithCommission);
            }
            console.log('✅ Verification Successful');
        } else {
            console.log(`❌ Fetch failed: ${eqRes.status}`);
            console.log(await eqRes.text());
        }

    } catch (e) {
        console.error(e);
    }
})();
