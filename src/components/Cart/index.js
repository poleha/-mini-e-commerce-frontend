import React, { PropTypes, Component } from 'react'
import { mapNodes } from '../../helpers/helper'
import { Link } from 'react-router'

export default class Cart extends Component {


  
    getCarts() {
        let carts = this.props.cart.carts;
        let cartsBlock = mapNodes(carts, function(elem, index){

            return (
                <div key={elem.id}>
                    <Link to={'/product/' + elem.product}>{ elem.title }</Link>
                </div>
            )

        });

        return cartsBlock;
    }

    buyOnClick() {
        this.props.actions.buy()
    }
    
    getBuyBlock() {
        if (this.props.cart.carts.ids.length > 0) {
            return (
                <div>
                    <a onClick={this.buyOnClick.bind(this)}>Buy</a>
                </div>
            )
        }
    }

    render() {
        if (this.props.cart.carts == null) return null
        return (

            <div className='cart'>
                {this.getCarts()}
                {this.getBuyBlock()}
            </div>
        )

    }

}