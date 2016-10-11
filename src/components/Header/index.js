import React, { PropTypes, Component } from 'react'
import Auth from '../../components/Auth'
import { Link } from 'react-router'
import Cart from '../../components/Cart'

export default class Header extends Component {
 

    render() {
        return (

            <header className='head'>
                <Link to={'/'}>Main page</Link>
                <Link to={'/registration'}>Registration</Link>
                       
                        <Cart 
                        userId={this.props.auth.userId}
                        actions={this.props.cartActions}
                        cart={this.props.cart}
                        />        
                
                        <Auth
                            data={this.props.auth}
                            actions={this.props.authActions}
                        />


            </header>
        )

    }

}