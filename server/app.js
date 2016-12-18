const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const muniHandler = require('./muni');
const usgsHandler = require('./usgs');
const letsEncryptReponse = process.env.CERTBOT_RESPONSE;

const app = express();

// Don't crash the whole party on an error
process.on('uncaughtException', console.error);
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Let's parse some json
app.use(bodyParser.json());
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/api/muni', muniHandler.getMuniData);
app.post('/api/usgs', usgsHandler.getNearbyEarthquakes);
app.get('/.well-known/acme-challenge/:content', (req, res) => res.send(letsEncryptReponse));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
