import { isObject } from 'lodash';

import { SF_BOUNDARIES } from '../constants';

export function extractUserLatLong(positionObject) {
  if (!positionObject || !isObject(positionObject) || !positionObject.coords) {
    return {};
  }

  return {
    lat: positionObject.coords.latitude,
    long: positionObject.coords.longitude,
  };
}

export function isInSF(userLatLong) {
  if (!userLatLong || !userLatLong.lat || !userLatLong.long ||
    typeof userLatLong.lat !== 'number' || typeof userLatLong.long !== 'number') {
    return false;
  }

  return (isInNorthSouthBounds(userLatLong.lat) && isInEastWestBounds(userLatLong.long));
}

function isInNorthSouthBounds(lat) {
  return (lat < SF_BOUNDARIES.NORTH && lat > SF_BOUNDARIES.SOUTH);
}

function isInEastWestBounds(long) {
  return (long < SF_BOUNDARIES.EAST && long > SF_BOUNDARIES.WEST);
}
