const baseUrl = 'https://api.rydeflexi.com';
const vehicleId = 1;

(async () => {
    try {
        // 1. Get Vehicle Details to find carOwnerId
        console.log(`Fetching vehicle ${vehicleId}...`);
        const vRes = await fetch(`${baseUrl}/api/vehicles/${vehicleId}`);
        if (!vRes.ok) {
            console.log(`Failed to get vehicle: ${vRes.status}`);
            return;
        }
        const vehicle = await vRes.json();
        console.log('Vehicle Data keys:', Object.keys(vehicle));
        console.log('carOwnerId:', vehicle.carOwnerId);

        const ownerId = vehicle.carOwnerId;
        if (!ownerId) {
            console.log('No carOwnerId found!');
            return;
        }

        // 2. Test Insurance Endpoint
        const insUrl = `${baseUrl}/api/owner-vehicle-insurances/car-owner/${ownerId}`;
        console.log(`Fetching insurances from: ${insUrl}`);
        const iRes = await fetch(insUrl, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`Status: ${iRes.status}`);
        const text = await iRes.text();
        console.log('Response preview:', text.substring(0, 500));

    } catch (e) {
        console.error(e);
    }
})();
