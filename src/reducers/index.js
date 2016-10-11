import { combineReducers } from 'redux'
import { routerReducer as routing} from 'react-router-redux'
import auth from './auth'
import vendorProfile from './vendorProfile'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  auth,
  vendorProfile
})