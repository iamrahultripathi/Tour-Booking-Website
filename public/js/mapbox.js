/* eslint-disable */

// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);
// mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtcmFodWx0cmlwYXRoaSIsImEiOiJjbGU3NWcwNGswMWs3NDByejZ0ZDRiMHhiIn0.HoByG_XVnXgS-B7m4Ee3bQ';

// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/iamrahultripathi/cle6yvysv005201qmt4ubx5uj',
//     scrollZoom: false
//         // center: [-118.113491, 34.111745],
//         // zoom: 10,
//         // interactive: false
// });

export const displayMap = locations => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoiaWFtcmFodWx0cmlwYXRoaSIsImEiOiJjbGU2eW0xb3cwMGJyM3JvMmUwZHhtZ3RqIn0.0m6-EA8o1OrMlKK-AfTKZg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/iamrahultripathi/cle6yvysv005201qmt4ubx5uj',
        scrollZoom: false
            // center: [-118.113491, 34.111745],
            // zoom: 10,
            // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
                element: el,
                anchor: 'bottom'
            })
            .setLngLat(loc.coordinates)
            .addTo(map);

        // Add popup
        new mapboxgl.Popup({
                offset: 30
            })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};