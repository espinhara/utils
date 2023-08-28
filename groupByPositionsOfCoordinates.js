function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's mean radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
function generateCoordinatesAround(existingCoordinates) {
  const groupedCoordinates = [];
  const radius = 50; // Grouping distance in km

  for (const coord of existingCoordinates) {
    let added = false;

    for (const group of groupedCoordinates) {
      const groupCenter = group[0];
      const distance = haversineDistance(
        coord.lat, coord.lon,
        groupCenter.lat, groupCenter.lon
      );

      if (distance <= radius) {
        group.push(coord);
        added = true;
        break;
      }
    }

    if (!added) {
      groupedCoordinates.push([coord]);
    }
  }

  return groupedCoordinates;
}

// Existing coordinates
const existingCoordinates = [
  {"lat": -34.190863635046504, "lon": 151.02179915194233},
  {"lat": -34.453529607532076, "lon": 150.82240854099263},
  {"lat": -34.254259229624395, "lon": 150.4848033121051},
  {"lat": -34.21752110990813, "lon": 150.9333161599491},
  {"lat": -34.5804016230573, "lon": 150.23514387564208},
  {"lat": -34.29675077629912, "lon": 150.53930533256892},
  {"lat": -34.47714719715905, "lon": 150.75130912076102},
  {"lat": -34.68563113316743, "lon": 150.2260107364074},
  {"lat": -34.334887911828055, "lon": 151.01050793911023},
  {"lat": -34.45188401829446, "lon": 150.87781909023008},
    {"lat": -23.550520, "lon": -46.633308}, // São Paulo (capital)
  {"lat": -22.906847, "lon": -43.172896}, // Rio de Janeiro (for reference)
  {"lat": -23.550451, "lon": -46.636030}, // São Paulo (capital)
  {"lat": -22.909821, "lon": -47.062581}, // Campinas
  {"lat": -23.179097, "lon": -45.886468}, // São José dos Campos
  {"lat": -23.543178, "lon": -46.629184}, 
  {"lat": -23.543178, "lon": -46.629184}, // São Paulo (capital)
  {"lat": -23.550930, "lon": -46.633850}, // São Paulo (capital) - Distance < 50 km
  {"lat": -23.558220, "lon": -46.640080}, // São Paulo (capital) - Distance < 50 km
  {"lat": -23.547300, "lon": -46.629780},
];

const groupedCoordinates = generateCoordinatesAround(existingCoordinates);
console.log(groupedCoordinates);
