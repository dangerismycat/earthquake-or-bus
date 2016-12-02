import { isObject } from 'lodash';

export function extractUserLatLong(positionObject) {
  if (!positionObject || !isObject(positionObject) || !positionObject.coords) {
    return {};
  }

  return {
    lat: positionObject.coords.latitude,
    long: positionObject.coords.longitude,
  };
}
