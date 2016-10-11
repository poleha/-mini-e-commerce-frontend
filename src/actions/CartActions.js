import { ADD_TO_CART_START, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from '../constants/Cart'
import { LOAD_CART_START, LOAD_CART_SUCCESS, LOAD_CART_FAIL } from '../constants/Cart'
import { BUY_FROM_CART_START, BUY_FROM_CART_SUCCESS, BUY_FROM_CART_FAIL } from '../constants/Cart'
import { REMOVE_FROM_CART_START, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL } from '../constants/Cart'
import { API_KEY } from '../middleware/api'
import { apiHost} from '../helpers/helper'
import { cart } from '../schemas'

const endpoint = apiHost;



export function addProductToCart(id) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}/products_in_cart/`,
                actions: [ADD_TO_CART_START, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
                body: {product: id},
                schema: cart
            }
        }
        
        return dispatch(action).then((response) => {
        }).catch((error) => {
        });

    }

}


export function loadCart() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: `${endpoint}/cart/`,
                actions: [LOAD_CART_START, LOAD_CART_SUCCESS, LOAD_CART_FAIL],
                schema: cart
            }
        }

        return dispatch(action).then((response) => {
        }).catch((error) => {
        });

    }

}



export function removeProductFromCart(id) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'DELETE',
                endpoint: `${endpoint}/cart/`,
                actions: [REMOVE_FROM_CART_START, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL],
                body: {product: id},
                schema: cart
            }
        }

        return dispatch(action).then((response) => {
        }).catch((error) => {
        });

    }

}


export function buy() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}/cart/`,
                actions: [BUY_FROM_CART_START, BUY_FROM_CART_SUCCESS, BUY_FROM_CART_FAIL],
            }
        }

        return dispatch(action).then((response) => {
        }).catch((error) => {
        });

    }

}
