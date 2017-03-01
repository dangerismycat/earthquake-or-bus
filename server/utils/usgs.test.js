const USGS = require('./usgs');

const mockUserLatLong = {
  lat: 20,
  long: 30,
};
const mockResponse = {
  metadata: {
    status: 200,
  },
  features: [{
    geometry: {
      coordinates: [5, 10],
    },
    properties: {
      time: Date.now() - 1000000,
      title: 'butts',
      place: 'sudden valley',
      mag: 9,
      url: 'bobloblawslawblog.com',
    },
  }, {
    geometry: {
      coordinates: [9, 30],
    },
    properties: {
      time: Date.now() - 10000,
      title: 'bees?',
      place: 'the leftorium',
      mag: 3,
      url: 'hypercompuglobalmega.net',
    },
  }],
};

/*** processUSGSResponse ***/
it('throws on no args', () => {
  function missingArgs() {
    USGS.processUSGSResponse();
  }

  expect(missingArgs).toThrow();
});

it('throws on invalid args', () => {
  function invalidArgs() {
    USGS.processUSGSResponse(5, {});
  }

  expect(invalidArgs).toThrow();
});

it('returns an array of objects', () => {
  const expectedResponse = [{
    description: expect.anything(),
    distance: expect.anything(),
    location: expect.anything(),
    magnitude: expect.anything(),
    time: expect.anything(),
    timeDifference: expect.anything(),
    url: expect.anything(),
  }, {
    description: expect.anything(),
    distance: expect.anything(),
    location: expect.anything(),
    magnitude: expect.anything(),
    time: expect.anything(),
    timeDifference: expect.anything(),
    url: expect.anything(),
  }];

  expect(USGS.processUSGSResponse(mockResponse, mockUserLatLong)).toEqual(expect.arrayContaining(expectedResponse));
});
