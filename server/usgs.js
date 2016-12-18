const request = require('request-promise');

const USGS_HELPERS = require('./utils/usgs');

const usgsURL = {};
// All significant earthquakes from the day (this may be too strict)
//  ("significant" definition: http://earthquake.usgs.gov/earthquakes/browse/significant.php#sigdef)
usgsURL.HIGH = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson';
// All earthquakes M2.5+ from the past day
usgsURL.MID = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
// All earthquakes M1.0+ from the past day, useful for testing/"demo mode"
usgsURL.LOW = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson';

// These determine what defines a "significant" quake.
// It's all very subjective, so tweak till the results feel right.
// Distance in miles, magnitude on moment magnitude scale, time in ms
const nearbyDistance = 100;
const weakSignificantMagnitude = 3.0;
const strongSignificantMagnitude = 4.0;
const recent = 1000 * 60 * 5;

function isRecent(quake) {
  return (Date.now() - quake.time) < recent;
}

function isSignificant(quake) {
  return (quake.distance < nearbyDistance && quake.magnitude >= strongSignificantMagnitude) ||
    (quake.distance < (nearbyDistance / 2) && quake.magnitude >= weakSignificantMagnitude);
}

function getNearbyEarthquakes(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    // TODO: early exit response (with error message?)
  }
  const userLatLong = { lat: req.body.lat, long: req.body.long };
  const sensitivityLevel = req.body.level || 'MID';

  request({
    method: 'GET',
    uri: usgsURL[sensitivityLevel],
    gzip: true,
  })
  .then((response) => {
    const parsedJson = JSON.parse(response);
    const earthquakes = USGS_HELPERS.processUSGSResponse(parsedJson, userLatLong);
    const recentEarthquakes = earthquakes.filter((quake) => isRecent(quake));
    const recentNearbyEarthquakes = sensitivityLevel === 'LOW' ?
      earthquakes.filter((quake) => quake.distance < nearbyDistance)
      : recentEarthquakes.filter((quake) => isSignificant(quake));

    res.json({ recentNearbyEarthquakes }).end();
  });
}

module.exports = {
  getNearbyEarthquakes,
};
