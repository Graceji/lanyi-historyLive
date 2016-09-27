import { ActionTypes } from './createStore';
import isPlainObject from 'lodash/isPlainObject';


export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  return function combination(state = {}, action) {
    var finalReducerKeys = Object.keys(finalReducerKeys);
    var hsaChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hsaChanged = hsaChanged || nextStateForKey !== previousStateForKey;
    }
    return hsaChanged ? nextState : state;
  }
}