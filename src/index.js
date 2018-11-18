import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { HomePage } from './features/home'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
