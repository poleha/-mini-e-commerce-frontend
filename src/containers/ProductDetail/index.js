import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'


function mapStateToProps(state) {
  return {
    product: state.product,
    logged: state.auth.logged,
    token: state.auth.token,
    userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

@asyncConnect([{
  promise: (params, helpers) => {
    let store = params.store;
    let productId = params.params.id;
      let loginPromise;
      if (global.loginPromise) {
      loginPromise = global.loginPromise;
      }
      else {
          loginPromise = Promise.resolve();
      }

      let promises = []
      let currentPromise = loginPromise.then(() => {
          return store.dispatch(productActions.loadProducts(null, productId));
      });


    promises.push(currentPromise);

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class ProductDetail extends BaseComponent {


 
  render() {
    let product = this.props.product.products.entities[this.props.product.products.ids];
    if (product == null) return null

      return <div>
          <div>{product.title}</div>
           <div>{product.price}</div>
           <div>{product.expire_date}</div>

          

      </div>
  }
}