import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { initGoogleApi } from './store/authorization'
import Layout from './ui/Templates/Layout'
import { FeedListRoute, EditFeedRoute, WatchFeedRoute, LoginRoute } from './routes'
import './styles/initial.scss'
import 'react-toastify/dist/ReactToastify.min.css'

store.dispatch(initGoogleApi())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginRoute} />
        <Layout>
          <Route exact path="/" component={FeedListRoute} />
          <Route path="/watch/:id" component={WatchFeedRoute} />
          <Route path="/edit/:id" component={EditFeedRoute} />
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
