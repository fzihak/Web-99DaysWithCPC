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
        // Base fare calculation (20 taka base + 5 taka per km)
        let baseFare = 20 + (distance * 5);
        let serviceCharge = baseFare * 0.05; // 5% service charge

        // Adjust fare based on ticket type
        switch(ticketType) {
            case 'round':
                baseFare *= 1.9; // 5% discount on return journey
                break;
            case 'day':
                baseFare *= 2.5; // Day pass costs 2.5 times single journey
                break;
        }

        // Update fare display
        $('#baseFare').text(`৳${baseFare.toFixed(2)}`);
        $('#serviceCharge').text(`৳${serviceCharge.toFixed(2)}`);
        $('#totalFare').text(`৳${(baseFare + serviceCharge).toFixed(2)}`);
    }

    // Event listeners
    $('#fromStation, #toStation').change(calculateFare);
    $('input[name="ticketType"]').change(calculateFare);

    // Station swap functionality
    $('#swapStations').click(function() {
        const fromVal = $('#fromStation').val();
        const toVal = $('#toStation').val();
        
        $('#fromStation').val(toVal);
        $('#toStation').val(fromVal);
        calculateFare();
    });
