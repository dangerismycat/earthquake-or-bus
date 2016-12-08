// All we care about is the current time (for caching) and the vehicle's name and lat/long
function processMuniResponse(response) {
  if (!response.Siri || !response.Siri.ServiceDelivery ||
    !response.Siri.ServiceDelivery.VehicleMonitoringDelivery ||
    !response.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity) {
    throw new Error('Muni response format is incorrect, or has changed.');
    return {};
  }

  const currentTime = Date.now();

  const vehicleArray = response.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
  const processedVehicleArray = vehicleArray.map((vehicle) => ({
    name: vehicle.MonitoredVehicleJourney.PublishedLineName,
    lat: vehicle.MonitoredVehicleJourney.VehicleLocation.Latitude,
    long: vehicle.MonitoredVehicleJourney.VehicleLocation.Longitude,
  }));

  return {
    currentTime,
    vehicles: processedVehicleArray,
  };
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
