import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Layout } from "./ui/Templates/Layout"
import { NewsPage } from './features/news'
import './styles/initial.scss'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={NewsPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
