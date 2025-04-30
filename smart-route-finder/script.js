// Map initialization
// Türkiye merkezli harita görünümü
const map = L.map('map').setView([39.0, 35.0], 6);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Global variables
let graph = {};
let coordinates = {};
let startMarker = null;
let endMarker = null;
let routeLine = null;
let startNode = null;
let endNode = null;

// Load graph data
fetch('graph-data.json')
    .then(response => response.json())
    .then(data => {
        graph = data.edges;
        coordinates = data.coordinates;
        
        // Add markers for all nodes
        for (const node in coordinates) {
            L.marker(coordinates[node])
                .bindPopup(`Node ${node}`)
                .addTo(map);
        }
    })
    .catch(error => console.error('Error loading graph data:', error));

// Function to find the nearest node to a clicked point
function findNearestNode(latLng) {
    let minDistance = Infinity;
    let nearestNode = null;
    
    for (const node in coordinates) {
        const nodeLatLng = L.latLng(coordinates[node]);
        const distance = latLng.distanceTo(nodeLatLng);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestNode = node;
        }
    }
    
    return nearestNode;
}

// Function to update the route
function updateRoute() {
    if (!startNode || !endNode) return;
    
    // Calculate shortest path
    const result = dijkstra(graph, startNode, endNode);
    
    if (result.distance === Infinity) {
        alert("No path found between the selected points!");
        return;
    }
    
    // Update UI
    document.getElementById('distance').textContent = result.distance.toFixed(2);
    
    // Draw the route
    const pathCoordinates = result.path.map(node => coordinates[node]);
    
    if (routeLine) {
        map.removeLayer(routeLine);
    }
    
    routeLine = L.polyline(pathCoordinates, {
        color: '#3388ff',
        weight: 5,
        opacity: 0.7,
        className: 'route-line'
    }).addTo(map);
    
    // Fit map to the route bounds
    map.fitBounds(routeLine.getBounds());
}

// Click event handler for the map
map.on('click', function(e) {
    const clickedNode = findNearestNode(e.latlng);
    
    if (!startNode) {
        // Set start point
        startNode = clickedNode;
        document.getElementById('start-point').textContent = `Node ${startNode}`;
        
        if (startMarker) {
            map.removeLayer(startMarker);
        }
        
        startMarker = L.marker(coordinates[startNode], {
            icon: L.divIcon({
                className: 'start-marker',
                html: '🟢',
                iconSize: [20, 20]
            })
        }).addTo(map);
    } else if (!endNode) {
        // Set end point
        endNode = clickedNode;
        document.getElementById('end-point').textContent = `Node ${endNode}`;
        
        if (endMarker) {
            map.removeLayer(endMarker);
        }
        
        endMarker = L.marker(coordinates[endNode], {
            icon: L.divIcon({
                className: 'end-marker',
                html: '🔴',
                iconSize: [20, 20]
            })
        }).addTo(map);
        
        // Calculate and draw route
        updateRoute();
    }
});

// Clear button event handler
document.getElementById('clear-btn').addEventListener('click', function() {
    startNode = null;
    endNode = null;
    
    document.getElementById('start-point').textContent = 'Not selected';
    document.getElementById('end-point').textContent = 'Not selected';
    document.getElementById('distance').textContent = '-';
    
    if (startMarker) {
        map.removeLayer(startMarker);
        startMarker = null;
    }
    
    if (endMarker) {
        map.removeLayer(endMarker);
        endMarker = null;
    }
    
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }
});