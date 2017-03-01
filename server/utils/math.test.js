const MATH = require('./math');


const mockLatLong1 = {
  lat: 10,
  long: 20,
};
const mockLatLong2 = {
  lat: 15,
  long: 25,
};
const mockInvalidLatLong = {
  latitude: 15,
  longitude: 25,
};


/*** convertMetersToFeet ***/
it('throws an error with missing args', () => {
  function missingArgs() {
    MATH.convertMetersToFeet();
  }

  expect(missingArgs).toThrow();
});

it('throws an error with invalid args', () => {
  function invalidArgs() {
    MATH.convertMetersToFeet('butts');
  }

  expect(invalidArgs).toThrow();
});

it('returns a number', () => {
  expect(typeof MATH.convertMetersToFeet(5)).toBe('number');
});


/*** convertMetersToMiles ***/
it('throws an error with missing args', () => {
  function missingArgs() {
    MATH.convertMetersToMiles();
  }

  expect(missingArgs).toThrow();
});

it('throws an error with invalid args', () => {
  function invalidArgs() {
    MATH.convertMetersToMiles('butts');
  }

  expect(invalidArgs).toThrow();
});

it('returns a number', () => {
  expect(typeof MATH.convertMetersToMiles(5)).toBe('number');
});


/*** distanceBetweenTwoPoints ***/
it('throws an error with missing args', () => {
  function missingArgs() {
    MATH.distanceBetweenTwoPoints(mockLatLong1);
  }

  expect(missingArgs).toThrow();
});

it('throws an error with invalid args', () => {
  function invalidArgs() {
    MATH.distanceBetweenTwoPoints(mockLatLong1, mockInvalidLatLong);
  }

  expect(invalidArgs).toThrow();
});

it('returns a number with correct args', () => {
  expect(typeof MATH.distanceBetweenTwoPoints(mockLatLong1, mockLatLong2)).toBe('number');
});
