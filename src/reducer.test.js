import { updateAttribute, updateCurrentView } from './reducer';


const mockInitialState = {
  buster: 'army had a half day',
  tina: 'butts',
};
const mockUpdatedBuster = {
  buster: 'in her robe and slippies?',
};
const mockUpdatedView = {
  view: 'the leftorium',
};
const mockUpdatedState = Object.assign({}, mockInitialState, mockUpdatedBuster);
const mockUpdatedViewState = Object.assign({}, mockInitialState, { currentView: mockUpdatedView.view });


/*** updateAttribute ***/
it('returns an object', () => {
  expect(typeof updateAttribute(null, {})).toBe('object');
});

it('returns a properly-updated state', () => {
  expect(updateAttribute(mockInitialState, { payload: mockUpdatedBuster })).toEqual(mockUpdatedState);
});

/*** updateCurrentView ***/
it('returns an object', () => {
  expect(typeof updateCurrentView(null, {})).toBe('object');
});

it('returns a properly-updated state', () => {
  expect(updateCurrentView(mockInitialState, mockUpdatedView)).toEqual(mockUpdatedViewState);
});
