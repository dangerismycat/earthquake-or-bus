const request = require('request-promise');

const USGS_HELPERS = require('./utils/usgs');

const usgsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson';
// This is in meters
const nearbyDistance = 300 * 1000;

function getNearbyEarthquakes(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    // TODO: early exit response (with error message?)
  }
  const userLatLong = req.body;

  request({
    method: 'GET',
    uri: usgsURL,
    gzip: true
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
