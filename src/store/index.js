import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import { api } from "./api";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument(api)))
);

export default store;
