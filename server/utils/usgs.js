const moment = require('moment');
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
    const distanceInMeters = MATH.distanceBetweenTwoPoints(userLatLong, { lat, long });
    const timeDifference = moment(quake.properties.time).fromNow();

    return {
      description: quake.properties.title,
      distance: MATH.convertMetersToMiles(distanceInMeters),
      location: quake.properties.place,
      magnitude: quake.properties.mag,
      timeDifference,
      url: quake.properties.url,
    };
  });

  console.log(`Total earthquakes data received: ${processedEarthquakeArray.length}`);
  return sortBy(processedEarthquakeArray, 'distance');
}

module.exports = {
  processUSGSResponse,
};
