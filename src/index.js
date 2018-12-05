import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { FeedListRoute, EditFeedRoute, WatchFeedRoute, LoginRoute } from './routes'
import MainLayout from './ui/Templates/MainLayout'

import './styles/initial.scss'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginRoute} />
        <MainLayout>
          <Route exact path="/" component={FeedListRoute} />
          <Route path="/watch/:id" component={WatchFeedRoute} />
          <Route path="/edit/:id" component={EditFeedRoute} />
        </MainLayout>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
