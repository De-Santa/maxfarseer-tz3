import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { FeedListRoute, EditFeedRoute, WatchFeedRoute, LoginRoute, SignUpRoute } from './routes'
import { ToastContainer, Flip } from 'react-toastify'
import MainLayout from './ui/Templates/MainLayout'

import './styles/initial.scss'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <ToastContainer
          position="top-left"
          transition={Flip}
        />
        <Switch>
          <Route path="/login" component={LoginRoute} />
          <Route path="/sign-up" component={SignUpRoute} />
          <MainLayout>
            <Route exact path="/" component={FeedListRoute} />
            <Route path="/watch/:id" component={WatchFeedRoute} />
            <Route path="/edit/:id" component={EditFeedRoute} />
          </MainLayout>
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
