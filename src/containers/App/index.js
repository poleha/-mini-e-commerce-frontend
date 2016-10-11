import React from 'react'
import BaseComponent from '../../components/BaseComponent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import * as authActions from '../../actions/AuthActions'
import * as cartActions from '../../actions/CartActions'
import { getUserInfo } from '../../actions/AuthActions'
import Header from '../../components/Header'

function mapStateToProps(state) {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        cartActions: bindActionCreators(cartActions, dispatch),
    }
}


@asyncConnect([{
    promise: (params) => {
        let store = params.store
        let state = store.getState();
        let promises = []
        if (!state.auth.logged) {
        promises.push(store.dispatch(getUserInfo()))
        }

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends BaseComponent {



    render() {
    return (
    <div>
    <div className='root' ref={(c) => this._root = c}>
        <Header {...this.props} />
        {this.props.children}
         </div>
         
        </div>
    )
  }
}




