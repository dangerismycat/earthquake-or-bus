const request = require('request-promise');

const API_KEYS = require('../secrets');
const MUNI_HELPERS = require('./utils/muni');
const muniURL = `http://api.511.org/transit/vehiclemonitoring?api_key=${API_KEYS.API_KEY_511}&format=json&agency=sf-muni`;
// This is in meters
const nearbyDistance = 400;

function getMuniData(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    // TODO: early exit response (with error message?)
  }
  const userLatLong = req.body;

  request({
    method: 'GET',
    uri: muniURL,
    gzip: true
  })
  .then((response) => {
    const sanitizedResponse = MUNI_HELPERS.stupidMuniAPIWorkaround(response);
    const parsedJson = JSON.parse(sanitizedResponse);
    const processedVehicles = MUNI_HELPERS.processMuniResponse(parsedJson, userLatLong);
    const closestFiveVehicles = processedVehicles.slice(0, 5).filter((vehicle) => vehicle.distance < nearbyDistance);

    res.json({ closestFiveVehicles }).end();
  });
}

module.exports = {
  getMuniData,
};
