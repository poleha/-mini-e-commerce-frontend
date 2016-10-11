import React, { PropTypes, Component } from 'react'
import Auth from '../../components/Auth'
import { Link } from 'react-router'

export default class Header extends Component {


 

    render() {
        return (

            <header className='head'>
                <div className='head_right'>
                    {/*
                    <div className='head_search'>
                        <form action='/'>
                            <input type='submit' value=''/>
                                <div className='input'><input type='text' placeholder='Поиск' required/></div>
                        </form>
                    </div>
                    */}

                    <div className='head_auth'>

                        <Auth
                            data={this.props.auth}
                            actions={this.props.authActions}
                        />

                        
                    </div>

                </div>
            </header>
        )

    }

}