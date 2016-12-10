const { sortBy } = require('lodash');

const MATH = require('./math');

// All we care about is the vehicle's name, line reference, and distance from the user.
// Returns sorted array of vehicles, smallest-distance-from-user first
function processMuniResponse(response, userLatLong) {
  if (!response.Siri || !response.Siri.ServiceDelivery ||
    !response.Siri.ServiceDelivery.VehicleMonitoringDelivery ||
    !response.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity) {
    throw new Error('Muni response format is incorrect, or has changed.');
    return {};
  }

  const vehicleArray = response.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
  const processedVehicleArray = vehicleArray.map((vehicle) => {
    const name = vehicle.MonitoredVehicleJourney.PublishedLineName;
    const lineRef = vehicle.MonitoredVehicleJourney.LineRef;
    const lat = vehicle.MonitoredVehicleJourney.VehicleLocation.Latitude;
    const long = vehicle.MonitoredVehicleJourney.VehicleLocation.Longitude;

    const distance = MATH.distanceBetweenTwoPoints(userLatLong, { lat, long });

    return {
      name,
      lineRef,
      distance,
    };
  });

  console.log(`Total vehicles data received: ${processedVehicleArray.length}`);
  return sortBy(processedVehicleArray, 'distance');
}

// 511's API yields a string with an invalid first character, so it needs to be removed
function stupidMuniAPIWorkaround(response) {
  const firstChar = response.substring(0, 1);
  const firstCharCode = response.charCodeAt(0);
  if (firstCharCode == 65279) {
    console.log(`First character ${firstChar} (character code: ${firstCharCode}) is invalid; removing it.`);
    return response.substring(1);
  }
  return response;
}


module.exports = {
  processMuniResponse,
  stupidMuniAPIWorkaround,
};
