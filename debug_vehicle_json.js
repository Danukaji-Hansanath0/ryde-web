const baseUrl = 'https://api.rydeflexi.com';
const vehicleId = 1;

(async () => {
    try {
        console.log(`Fetching vehicle ${vehicleId}...`);
        const vRes = await fetch(`${baseUrl}/api/vehicles/${vehicleId}`);
        if (!vRes.ok) {
            console.log(`Failed to get vehicle: ${vRes.status}`);
            return;
        }
        const vehicle = await vRes.json();
        console.log('--- FULL VEHICLE OBJECT ---');
        console.log(JSON.stringify(vehicle, null, 2));
        console.log('---------------------------');
    } catch (e) {
        console.error(e);
    }
})();
