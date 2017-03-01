import { updateAttribute, updateCurrentView, getNearbyDataThunk } from './action-creators';
import { ACTIONS } from './constants';


const mockAttribute = 'butts';
const mockView = 'sudden valley';

/*** updateAttribute ***/
it('returns an object', () => {
  expect(typeof updateAttribute()).toBe('object');
});

it('returns an object with type and view properties', () => {
  expect(updateAttribute(mockAttribute)).toEqual({
    type: ACTIONS.UPDATE_ATTRIBUTE,
    payload: mockAttribute,
  });
});

/*** updateCurrentView ***/
it('returns an object', () => {
  expect(typeof updateCurrentView()).toBe('object');
});

it('returns an object with type and payload properties', () => {
  expect(updateCurrentView(mockView)).toEqual({
    type: ACTIONS.UPDATE_CURRENT_VIEW,
    view: mockView,
  });
});


/*** getNearbyDataThunk ***/
