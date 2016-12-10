const { sortBy } = require('lodash');

const MATH = require('./math');

function processUSGSResponse(response, userLatLong) {
  if (!response || !response.metadata || !response.metadata.status ||
    response.metadata.status != 200 || !response.features) {
    throw new Error('USGS response format is incorrect, or has changed.');
    return [];
  }

  const processedEarthquakeArray = response.features.map((quake) => {
    const lat = quake.geometry.coordinates[1];
    const long = quake.geometry.coordinates[0];
    const distance = MATH.distanceBetweenTwoPoints(userLatLong, { lat, long });

    return {
      description: quake.properties.title,
      distance,
      location: quake.properties.place,
      magnitude: quake.properties.mag,
      time: quake.properties.time,
      url: quake.properties.url,
    };
  });

  console.log(`Total earthquakes data received: ${processedEarthquakeArray.length}`);
  return sortBy(processedEarthquakeArray, 'distance');
}

module.exports = {
  processUSGSResponse,
};
