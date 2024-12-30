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