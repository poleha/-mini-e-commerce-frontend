import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'
import * as cartActions from '../../actions/CartActions'


function mapStateToProps(state) {
  return {
    product: state.product,
    logged: state.auth.logged,
    token: state.auth.token,
    userId: state.auth.userId,
    cart: state.cart
    };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch)
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

    getProduct() {
        return this.props.product.products.entities[this.props.product.products.ids];
    }

    
    addToCart(e) {
        e.preventDefault()
        this.props.cartActions.addProductToCart(this.props.product.products.ids)
    }

    removeFromCart(e) {
        e.preventDefault()
        this.props.cartActions.removeProductFromCart(this.props.product.products.ids)
    }
    
getCartBlock() {
    if (this.props.cart.carts == null) return null
    let productId = this.props.product.products.ids;
    let productInCart = false
    for (var key in this.props.cart.carts.entities) {
        if (this.props.cart.carts.entities[key].product == productId) {
            productInCart = true
            break
        }
    }

    if (!productInCart) {
    return (
        <div>
         <a onClick={this.addToCart.bind(this)}>Add to cart </a>
        </div>
    )
    }
    else {
        return (
            <div>
                <a onClick={this.removeFromCart.bind(this)}>Remove from cart </a>
            </div>
        )

    }

}


 
  render() {
    let product = this.getProduct();
    if (product == null) return null

      return <div>
          <div>{product.title}</div>
           <div>{product.price}</div>
           <div>{product.expire_date}</div>
          {this.getCartBlock()}

          

      </div>
  }
}