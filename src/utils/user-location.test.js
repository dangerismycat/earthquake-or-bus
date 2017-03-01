import { extractUserLatLong, isInSF } from './user-location';
import { DEMO_LOCATIONS, SF_BOUNDARIES } from '../constants';


const mockLat = Math.floor(Math.random() * 100);
const mockLong = Math.floor(Math.random() * 100);
const mockPositionObject = {
  coords: {
    latitude: mockLat,
    longitude: mockLong,
  },
};


/*** extractUserLatLong ***/
it('returns an object', () => {
  expect(extractUserLatLong()).toEqual({});
});

it('returns a latLong object when given a valid positionObject', () => {
  expect(extractUserLatLong(mockPositionObject)).toEqual({
    lat: mockLat,
    long: mockLong,
  });
});


/*** isInSF ***/
it('returns true for latLong in SF', () => {
  expect(isInSF(DEMO_LOCATIONS.FILLMORE)).toBeTruthy();
});

it('returns false with no args', () => {
  expect(isInSF()).toBeFalsy();
});

it('returns false with incorrect format args', () => {
  expect(isInSF({
    latitude: mockLat,
    longitude: mockLong,
  })).toBeFalsy();
});

it('returns false with invalid args', () => {
  expect(isInSF({
    lat: 'butts',
    long: 'butts',
  })).toBeFalsy();
});

it('returns false for latLong north of SF', () => {
  expect(isInSF({
    lat: DEMO_LOCATIONS.FILLMORE.lat + 10,
    long: DEMO_LOCATIONS.FILLMORE.long,
  })).toBeFalsy();
});

it('returns false for latLong south of SF', () => {
  expect(isInSF({
    lat: DEMO_LOCATIONS.FILLMORE.lat - 10,
    long: DEMO_LOCATIONS.FILLMORE.long,
  })).toBeFalsy();
});

it('returns false for latLong west of SF', () => {
  expect(isInSF({
    lat: DEMO_LOCATIONS.FILLMORE.lat,
    long: DEMO_LOCATIONS.FILLMORE.long - 10,
  })).toBeFalsy();
});

it('returns false for latLong east of SF', () => {
  expect(isInSF({
    lat: DEMO_LOCATIONS.FILLMORE.lat,
    long: DEMO_LOCATIONS.FILLMORE.long + 10,
  })).toBeFalsy();
});
