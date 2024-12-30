$(document).ready(function() {
    // Station data with distances (in km) from Uttara North
    const stationData = {
        'uttara': { name: 'Uttara North', distance: 0 },
        'uttara-center': { name: 'Uttara Center', distance: 1.2 },
        'uttara-south': { name: 'Uttara South', distance: 2.4 },
        'pallabi': { name: 'Pallabi', distance: 4.1 },
        'mirpur11': { name: 'Mirpur 11', distance: 5.6 },
        'mirpur10': { name: 'Mirpur 10', distance: 7.2 },
        'kazipara': { name: 'Kazipara', distance: 8.4 },
        'shewrapara': { name: 'Shewrapara', distance: 9.6 },
        'agargaon': { name: 'Agargaon', distance: 11.3 }
    };
     // Populate station dropdowns
     function populateStations() {
        const stations = Object.entries(stationData);
        const $fromStation = $('#fromStation');
        const $toStation = $('#toStation');

        stations.forEach(([value, data]) => {
            const option = `<option value="${value}">${data.name}</option>`;
            $fromStation.append(option);
            $toStation.append(option);
        });
    }

    populateStations();

    // Calculate fare based on distance and ticket type
    function calculateFare() {
        const fromStation = $('#fromStation').val();
        const toStation = $('#toStation').val();
        const ticketType = $('input[name="ticketType"]:checked').val();

        if (!fromStation || !toStation) return;

        const distance = Math.abs(
            stationData[toStation].distance - stationData[fromStation].distance
        );
