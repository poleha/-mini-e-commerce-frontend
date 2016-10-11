import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import VendorProfileList from './containers/VendorProfileList'
import VendorProfileDetail from './containers/VendorProfileDetail'

export default (
  <Route path='/' component={App}>
     <IndexRoute component={VendorProfileList} />
     <Route path='/vendor/:id' component={VendorProfileDetail} />

  </Route>
)
