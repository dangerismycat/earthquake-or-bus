import createReducer from './create-reducer';


const mockInitialState = {
  buster: 'army had a half day',
  tina: 'butts',
};
const mockUpdatedBuster = {
  buster: 'in her robe and slippies?',
};
const mockUpdatedState = Object.assign({}, mockInitialState, mockUpdatedBuster);

function busterChanger(state) {
  return {
    ...state,
    ...mockUpdatedBuster,
  };
}

const mockConstant = {
  BUSTER: 'BUSTER',
}
const mockHandlers = {
  [mockConstant.BUSTER]: busterChanger,
};
const mockAction = {
  type: mockConstant.BUSTER,
};

it('returns a function', () => {
  const reducerFunction = createReducer();
  expect(typeof reducerFunction).toBe('function');
});

it('reducerFunction returns initialState if given no args', () => {
  const reducerFunction = createReducer(mockInitialState);
  expect(reducerFunction()).toEqual(mockInitialState);
});

it('reducerFunction returns initialState if no handler action types match', () => {
  const reducerFunction = createReducer(mockInitialState, mockHandlers);
  expect(reducerFunction(undefined, { type: 'BUTTS' })).toEqual(mockInitialState);
});

it('reducerFunction returns updated state if a handler action type matches', () => {
  const reducerFunction = createReducer(mockInitialState, mockHandlers);
  expect(reducerFunction(undefined, mockAction)).toEqual(mockUpdatedState);
});
