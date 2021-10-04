import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

import './style.css';

// initial state of app
const initialState = {
  color: '#ff9999',
  loading: false,
  count: 0,
};

// actions
const ACTIONS = {
  ADD: 'ADD',
  SUB: 'SUB',
  SET_COUNT: 'SET_COUNT',
  SET_COLOR: 'SET_COLOR',
  SET_LOADING: 'SET_LOADING',
};

// reducer function
function countReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD': // using string, bad practice
      return {
        ...state,
        count: state.count + 1,
      };

    case ACTIONS.SUB:
      return {
        ...state,
        count: state.count - 1,
      };

    case ACTIONS.SET_COLOR:
      return {
        ...state,
        color: action.value,
      };

    case ACTIONS.SET_COUNT:
      return {
        ...state,
        count: action.value,
      };

    default:
      return state;
  }
}

// action creators
const add = () => {
  return {
    type: ACTIONS.ADD,
  };
};

const sub = () => ({
  type: ACTIONS.SUB,
});

const setColor = (value) => ({
  type: ACTIONS.SET_COLOR,
  value,
});

const setCount = (value) => ({
  type: ACTIONS.SET_COUNT,
  value,
});

const CountDisplay = (props) => {
  // state = {color: "", loading: false, count: 0}
  const count = useSelector((state) => state.count);
  console.log('Count rerenderd');
  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

// components

// Add component
const AddBtn = () => {
  console.log('Add componet re-renderd');
  // not a good way
  const { color, count } = useSelector((state) => state);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch({ type: 'ADD' });
  };
  return (
    <div style={{ borderColor: color }}>
      <h1>{count}</h1>
      <button onClick={clickHandler}>Add</button>
    </div>
  );
};

// substract component
const SubBtn = () => {
  const color = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(sub()); // using action craator
    // dispatch({ type: 'SUB' }); // manually providing type
  };
  return (
    <div style={{ borderColor: color }}>
      <button onClick={clickHandler}>subsctract</button>
    </div>
  );
};

// color picker component
const ColorPicker = () => {
  console.log('color picker re-renderd');
  const borderColor = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const handleColor = (e) => {
    dispatch(setColor(e.target.value));
  };
  return (
    <div style={{ borderColor }}>
      <input type="color" onChange={handleColor} value={borderColor} />
    </div>
  );
};

// manual input component
const ManualCount = () => {
  const dispatch = useDispatch();

  const handleNumber = (e) => {
    dispatch(setCount(e.target.value));
  };
  return (
    <div>
      <input type="number" onChange={handleNumber} />
    </div>
  );
};

// the grid
function App() {
  return (
    <div className="grid">
      <CountDisplay />
      <AddBtn />
      <SubBtn />
      <ColorPicker />
      <ManualCount />
    </div>
  );
}

const store = createStore(countReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
