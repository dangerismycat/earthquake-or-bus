const request = require('request-promise');

const MUNI_HELPERS = require('./utils/muni');
const MUNI_API_KEY = process.env.NODE_ENV === 'production' ? process.env.API_KEY_511 : require('../secrets').API_KEY_511;
const muniURL = `http://api.511.org/transit/vehiclemonitoring?api_key=${MUNI_API_KEY}&format=json&agency=sf-muni`;
// This is in feet
const nearbyDistance = 1300;

function getMuniData(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    throw new Error('No request or request LatLong');
  }
  const userLatLong = req.body;

  request({
    method: 'GET',
    uri: muniURL,
    gzip: true,
  })
  .then((response) => {
    const sanitizedResponse = MUNI_HELPERS.stupidMuniAPIWorkaround(response);
    const parsedJson = JSON.parse(sanitizedResponse);
    const processedVehicles = MUNI_HELPERS.processMuniResponse(parsedJson, userLatLong);
    const closestFiveVehicles =
      processedVehicles.filter((vehicle) => vehicle.distance < nearbyDistance).slice(0, 5);

    res.json({ closestFiveVehicles }).end();
  });
}

module.exports = {
  getMuniData,
};
