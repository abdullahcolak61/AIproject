# Smart Route Navigator

A web-based application for finding and visualizing the shortest path between cities in Turkey using Dijkstra's algorithm.

## Overview

This application provides an interactive map interface where users can:
- Select starting and ending cities in Turkey
- View the shortest route between the selected cities
- See the total distance of the route

The application uses Leaflet.js for map visualization and implements Dijkstra's algorithm for finding the optimal path between cities.

## Features

- Interactive map showing cities in Turkey
- Click-to-select functionality for start and end points
- Real-time calculation of the shortest path
- Visual representation of the route on the map
- Distance calculation between cities
- Responsive design that works on both desktop and mobile devices

## Files Description

- `index.html` - Main HTML structure of the application
- `style.css` - Styling for the application
- `script.js` - Main JavaScript code for the application functionality
- `dijkstra.js` - Implementation of Dijkstra's algorithm with priority queue
- `graph-data.json` - JSON data containing city nodes, connections, weights, and coordinates

## How it Works

1. **Map Initialization**: The application initializes a Leaflet map centered on Turkey.
2. **Data Loading**: City data is loaded from `graph-data.json`, including coordinates and road connections.
3. **User Interaction**: Users can click on the map to select start and end cities.
4. **Path Finding**: Using Dijkstra's algorithm, the application calculates the shortest path between the selected cities.
5. **Visualization**: The route is displayed on the map as a blue line.
6. **Route Information**: The application shows the starting city, ending city, and total distance in kilometers.

## How to Use

1. Open `index.html` in a web browser.
2. Click on any city on the map to select it as your starting point (marked with a green marker).
3. Click on another city to select it as your destination (marked with a red marker).
4. The application will automatically calculate and display the shortest route between the two cities.
5. The total distance will be shown in the controls panel.
6. To reset the selection and start over, click the "Clear Route" button.

## Technical Implementation

The application uses:
- **Leaflet.js**: For map visualization
- **Dijkstra's Algorithm**: For finding the shortest path between cities
- **Priority Queue**: For efficient path selection in the algorithm
- **JSON Data Structure**: For storing city information and road connections

## City Data

The application includes data for 20 major cities in Turkey:
Istanbul, Ankara, Izmir, Antalya, Bursa, Adana, Samsun, Trabzon, Diyarbakir, Gaziantep, Konya, Mersin, Kayseri, Eskişehir, Erzurum, Malatya, Van, Sivas, Balıkesir, and Denizli.

Each city is connected to other cities with road connections, and each connection has a weight representing the distance in kilometers.

## Requirements

- Modern web browser with JavaScript enabled
- Internet connection (for loading the OpenStreetMap tiles)

## Possible Enhancements

- Add more cities and road connections
- Implement alternative routing algorithms
- Add traffic data for more realistic route planning
- Provide turn-by-turn directions
- Add elevation profile for routes