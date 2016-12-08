const http = require('http');
const fs = require('fs');
const request = require('request-promise');
const { map } = require('lodash');

const API_KEYS = require('../secrets');
const MUNI_HELPERS = require('./utils/muni');
const muniURL = `http://api.511.org/transit/vehiclemonitoring?api_key=${API_KEYS.API_KEY_511}&format=json&agency=sf-muni`;

// TODO: cache this data!
function getMuniData(req, res) {
  if (!req.body || !req.body.lat || !req.body.long) {
    // TODO: early exit response (with error message?)
  }
  const { lat: userLat, long: userLong } = req.body;

  request({
    method: 'GET',
    uri: muniURL,
    gzip: true
  })
  .then((response) => {
    const sanitizedResponse = MUNI_HELPERS.stupidMuniAPIWorkaround(response);
    const parsedJson = JSON.parse(sanitizedResponse);
    const processedData = MUNI_HELPERS.processMuniResponse(parsedJson);
    // console.log('PROCESSED:', processedData);

    // TODO: find closest vehicle to user's latLong

    // TODO: response with data
  });
}

module.exports = {
  getMuniData,
};
