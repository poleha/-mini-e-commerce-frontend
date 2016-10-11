import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { mapNodes } from '../../helpers/helper'
import { bindActionCreators } from 'redux'
import * as vendorProfileActions from '../../actions/VendorProfileActions'
import * as productActions from '../../actions/ProductActions'
import { Link } from 'react-router'


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
      let params = {}
      params['user__vendor_profile'] = this.props.params.id;
      params['limit'] = this.props.product.products.ids.length + 10;
    this.props.productActions.loadProducts(params)

  }

  refreshProductsClick(e) {
      let params = {}
      params['user__vendor_profile'] = this.props.params.id;
    this.props.productActions.loadProducts(params)

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
                <div>Product: <Link to={'/product/' + elem.id}>{ elem.title }</Link></div>
                <div>Price: { elem.price }</div>
                </div>    
                )

            }.bind(this));

        return productsBlock;
    }


  filterFormInputChange(fieldName, e) {
      let params = {}
      params[fieldName] = e.target.value;
      params['user__vendor_profile'] = this.props.params.id;
      this.props.productActions.loadProducts(params)
  }

    getFilterForm() {
        return (
            <div>
                <form>
                    <input placeholder="Min price" onChange={this.filterFormInputChange.bind(this, 'price__gte')} name='price__gte' type="text"/>
                    <input placeholder="Max price" onChange={this.filterFormInputChange.bind(this, 'price__lte')} name="price__lte" type="text"/>
                    <input placeholder="Title" onChange={this.filterFormInputChange.bind(this, 'title__icontains')} name="title__icontains" type="text"/>
                </form>

            </div>
        )
    }


  render() {
    let vendorProfile = this.props.vendorProfile.vendorProfiles.entities[this.props.vendorProfile.vendorProfiles.ids]

      return <div>


          <a
            onClick={this.refreshProductsClick.bind(this)}
            type='button'
            className='button button_left button_height button_reload button_reload_search'
         >
              Refresh
        </a>

          {this.getFilterForm()}
          
          <section>
              <div>{vendorProfile.business_name}</div>
              <div>{vendorProfile.location}</div>
              <div>{vendorProfile.description}</div>
              <h3>Products: </h3>
            {this.getProductsBlock()}
              <p className='text-center'>
              {this.getShowMoreInput()}
              </p>

</section>

      </div>
  }
}



