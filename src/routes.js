import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import VendorProfileList from './containers/VendorProfileList'
import VendorProfileDetail from './containers/VendorProfileDetail'
import Registration from './containers/Registration'
import ProductDetail from './containers/ProductDetail'

export default (
  <Route path='/' component={App}>
     <IndexRoute component={VendorProfileList} />
     <Route path='/vendor/:id' component={VendorProfileDetail} />
      <Route path='/product/:id' component={ProductDetail} />
      <Route path='/registration' component={Registration} />

  </Route>
)
