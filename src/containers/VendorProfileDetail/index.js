import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { mapNodes } from '../../helpers/helper'
import { bindActionCreators } from 'redux'
import * as vendorProfileActions from '../../actions/VendorProfileActions'
import * as productActions from '../../actions/ProductActions'


function mapStateToProps(state) {
  return {
    vendorProfile: state.vendorProfile,
    product: state.product,
    logged: state.auth.logged,
    token: state.auth.token,
    userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
  return {
    vendorProfileActions: bindActionCreators(vendorProfileActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  };
}

@asyncConnect([{
  promise: (params, helpers) => {
    let store = params.store;
    let vendorId = params.params.id;
      let loginPromise;
      if (global.loginPromise) {
      loginPromise = global.loginPromise;
      }
      else {
          loginPromise = Promise.resolve();
      }

      let promises = []
      let currentPromise = loginPromise.then(() => {
          return store.dispatch(vendorProfileActions.loadVendorProfiles(vendorId));
      }).then((res) => {
          return store.dispatch(productActions.loadProducts({user__vendor_profile: vendorId}));
      });


    promises.push(currentPromise);

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class VendorProfileDetail extends BaseComponent {





  loadMoreProductsClick(e) {
    this.props.productActions.loadProducts({limit: this.props.product.products.ids.length + 30})

  }

  refreshProductsClick(e) {
    this.props.productActions.loadProducts()

  }




    getShowMoreInput() {
        let products = this.props.product.products;
        if (products == null) return null;
        let showMoreInput;
        if (this.props.product.count > products.ids.length) {
            showMoreInput = (
                <input
                    onClick={this.loadMorePostsClick.bind(this)}
                    className='button button_middle button_height'
                    type='button'
                    value='Show more'>
                </input>
            )
        }
        return showMoreInput;
    }

    getProductsBlock() {
            if (this.props.product.loading && this.props.product.products === null) return null;
            let products = this.props.product.products;
            let productsBlock = mapNodes(products, function(elem, index){

                return (
                <div key={elem.id}>
                { elem.title }
                </div>    
                )

            }.bind(this));

        return productsBlock;
    }



  render() {


      return <div ref={(c) => this._post_list = c}>


          <a
            onClick={this.refreshProductsClick.bind(this)}
            type='button'
            className='button button_left button_height button_reload button_reload_search'
         >
              Refresh
        </a>

          <section>

            {this.getProductsBlock()}
              <p className='text-center'>
              {this.getShowMoreInput()}
              </p>

</section>

      </div>
  }
}





//PostList.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
//}

//PostList.contextTypes = {
  //router: PropTypes.object.isRequired
//}