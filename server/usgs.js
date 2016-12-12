const request = require('request-promise');

const USGS_HELPERS = require('./utils/usgs');

// All significant earthquakes from the day
//  ("significant" definition: http://earthquake.usgs.gov/earthquakes/browse/significant.php#sigdef)
// const usgsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson';
// All earthquakes M2.5+ from the past day
// const usgsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
// All earthquakes M1.0+ from the past day, useful for testing
const usgsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson';
// This is in miles
const nearbyDistance = 400;

function getNearbyEarthquakes(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    // TODO: early exit response (with error message?)
  }
  const userLatLong = req.body;

  request({
    method: 'GET',
    uri: usgsURL,
    gzip: true,
  })
  .then((response) => {
    const parsedJson = JSON.parse(response);
    const recentEarthquakes = USGS_HELPERS.processUSGSResponse(parsedJson, userLatLong);
    const recentNearbyEarthquakes = recentEarthquakes.filter((quake) => quake.distance < nearbyDistance);

    res.json({ recentNearbyEarthquakes }).end();
  });
}

module.exports = {
  getNearbyEarthquakes,
};
