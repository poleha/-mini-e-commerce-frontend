import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { mapNodes } from '../../helpers/helper'
import { bindActionCreators } from 'redux'
import * as vendorProfileActions from '../../actions/VendorProfileActions'


function mapStateToProps(state) {
  return {
    vendorProfile: state.vendorProfile,
    logged: state.auth.logged,
    token: state.auth.token,
    userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
  return {
    vendorProfileActions: bindActionCreators(vendorProfileActions, dispatch)
  };
}

@asyncConnect([{
  promise: (params, helpers) => {
    let store = params.store;
    let tag = params.params.tag;
      let loginPromise;
      if (global.loginPromise) {
      loginPromise = global.loginPromise;
      }
      else {
          loginPromise = Promise.resolve();
      }
      let currentPromise = loginPromise.then(() => store.dispatch(vendorProfileActions.loadVendorProfiles()));
      let promises = [];
    promises.push(currentPromise);

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class VendorProfileList extends BaseComponent {





  loadMorePostsClick(e) {
    this.props.vendorProfileActions.loadVendorProfiles({limit: this.props.vendorProfile.vendorProfiles.ids.length + 10})

  }

  refreshPostsClick(e) {
    this.props.vendorProfileActions.loadVendorProfiles()

  }




    getShowMoreInput() {
        let vendorProfiles = this.props.vendorProfile.vendorProfiles;
        if (vendorProfiles == null) return null;
        let showMoreInput;
        if (this.props.vendorProfile.count > vendorProfiles.ids.length) {
            showMoreInput = (
                <input
                    onClick={this.loadMorePostsClick.bind(this)}
                    className='button button_middle button_height'
                    type='button'
                    value='Показать еще'>
                </input>
            )
        }
        return showMoreInput;
    }

    getVendorProfilesBlock() {
            if (this.props.vendorProfile.loading && this.props.vendorProfile.vendorProfiles === null) return null;
            let vendorProfiles = this.props.vendorProfile.vendorProfiles;
            let vendorProfilesBlock = mapNodes(vendorProfiles, function(elem, index){

                return (
                <div key={elem.id}>
                { elem.business_name }
                </div>    
                )

            }.bind(this));

        return vendorProfilesBlock;
    }



  render() {


      return <div className='post_list' ref={(c) => this._post_list = c}>


          <a
            onClick={this.refreshPostsClick.bind(this)}
            type='button'
            className='button button_left button_height button_reload button_reload_search'
         >
              Refresh
        </a>

          <section className='cards'>

            {this.getVendorProfilesBlock()}
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