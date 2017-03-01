const MUNI = require('./muni');

const mockUserLatLong = {
  lat: 20,
  long: 30,
};
const mockResponse = {
  Siri: {
    ServiceDelivery: {
      VehicleMonitoringDelivery: {
        VehicleActivity: [
          {
            MonitoredVehicleJourney: {
              PublishedLineName: 'butts',
              LineRef: 42,
              VehicleLocation: {
                Latitude: 10,
                Longitude: 20,
              },
            },
          },
          {
            MonitoredVehicleJourney: {
              PublishedLineName: 'oh myyyyy',
              LineRef: 43,
              VehicleLocation: {
                Latitude: 11,
                Longitude: 21,
              },
            },
          },
        ],
      },
    },
  },
};

/*** processMuniResponse ***/
it('throws on no args', () => {
  function missingArgs() {
    MUNI.processMuniResponse();
  }

  expect(missingArgs).toThrow();
});

it('throws on invalid args', () => {
  function invalidArgs() {
    MUNI.processMuniResponse(5, {});
  }

  expect(invalidArgs).toThrow();
});

it('returns an array of objects', () => {
  const expectedResponse = [{
    name: expect.any(),
    distance: expect.any(),
  }, {
    name: expect.any(),
    distance: expect.any(),
  }];

  expect(MUNI.processMuniResponse(mockResponse, mockUserLatLong)).toEqual(expect.arrayContaining(expectedResponse));
});

/*** stupidMuniAPIWorkaround ***/
it('throws on no arg', () => {
  function missingArg() {
    MUNI.stupidMuniAPIWorkaround();
  }

  expect(missingArg).toThrow();
});

it('throws on invalid arg', () => {
  function invalidArg() {
    MUNI.stupidMuniAPIWorkaround(5);
  }

  expect(invalidArg).toThrow();
});

it('returns a string', () => {
  expect(typeof MUNI.stupidMuniAPIWorkaround('butts')).toBe('string');
});
