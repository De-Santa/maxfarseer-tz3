import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Layout } from "./ui/Templates/Layout"
import { FeedsPage } from './routes/feeds'
import { EditFeedPage, WatchFeedPage } from './routes/feed'
import './styles/initial.scss'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={FeedsPage} />
          <Route path="/watch/:id" component={WatchFeedPage} />
          <Route path="/edit/:id" component={EditFeedPage} />
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
