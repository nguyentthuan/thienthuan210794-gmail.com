import { createStore, combineReducers } from 'redux';

import { home,member } from './reducers';

const reducers = combineReducers({
  home,member,
});

const store = createStore(reducers);

export default store;