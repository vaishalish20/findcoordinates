var map = null; // Variable to store the map instance
        function findLocation() {
            var locationInput = document.getElementById('locationInput').value;

            // Use the OpenStreetMap Nominatim API to geocode the location
            var apiUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(locationInput);

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        var latitude = parseFloat(data[0].lat);
                        var longitude = parseFloat(data[0].lon);

                        // Display the coordinates
                       document.getElementById('coordinates').textContent = 'Latitude: ' + latitude + ', Longitude: ' + longitude;

                       // Remove the existing map if it exists
                       if (map !== null) {
                        map.remove();
                    }
                    // Initialize the new map and set the location marker
                    map = L.map('map').setView([latitude, longitude], 12);
                    L.marker([latitude, longitude]).addTo(map);

                        // Add the OpenStreetMap tile layer
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                            maxZoom: 19,
                        }).addTo(map);
                    } else {
                        document.getElementById('coordinates').textContent = 'Location not found';
                    }
                })
                .catch(error => console.log(error));
        }
        // Set the default view to India when the document loads
document.addEventListener("DOMContentLoaded", function() {
    map = L.map('map').setView([20.5937, 78.9629], 5); // Set the default view to India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);
});