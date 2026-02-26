const baseUrl = 'https://api.rydeflexi.com';

(async () => {
    try {
        console.log('--- Probing for carOwnerId ---');

        // 1. Try simple list
        console.log('\n1. Fetching /api/vehicles list...');
        const listRes = await fetch(`${baseUrl}/api/vehicles?page=0&size=1`);
        if (listRes.ok) {
            const listData = await listRes.json();
            const firstVehicle = listData.content ? listData.content[0] : (Array.isArray(listData) ? listData[0] : null);
            if (firstVehicle) {
                console.log('List Item Keys:', Object.keys(firstVehicle));
                console.log('carOwnerId:', firstVehicle.carOwnerId);
                console.log('ownerId:', firstVehicle.ownerId);
                console.log('owner:', firstVehicle.owner);
            } else {
                console.log('List empty or format unknown:', Object.keys(listData).slice(0, 5));
            }
        } else {
            console.log(`List failed: ${listRes.status}`);
        }

        // 2. Try search available
        console.log('\n2. Fetching /api/vehicles/search/available...');
        const searchRes = await fetch(`${baseUrl}/api/vehicles/search/available?startDate=2026-03-01&endDate=2026-03-02`);
        if (searchRes.ok) {
            const searchData = await searchRes.json();
            const firstResult = searchData.data && searchData.data[0] ? searchData.data[0] : null;
            if (firstResult) {
                console.log('Search Item Keys:', Object.keys(firstResult));
                console.log('carOwnerId:', firstResult.carOwnerId);
            } else {
                console.log('Search empty or format unknown');
            }
        } else {
            console.log(`Search failed: ${searchRes.status}`);
        }

    } catch (e) {
        console.error(e);
    }
})();
