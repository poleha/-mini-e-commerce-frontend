import {ADD_TO_CART_START, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL} from '../constants/Cart'
import {LOAD_CART_START, LOAD_CART_SUCCESS, LOAD_CART_FAIL} from '../constants/Cart'
import {REMOVE_FROM_CART_START, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL} from '../constants/Cart'
import {BUY_FROM_CART_START, BUY_FROM_CART_SUCCESS, BUY_FROM_CART_FAIL} from '../constants/Cart'
import update from 'react-addons-update'
var newState, cart, carts;

const initialState = {
    carts: null,
    count: 0,
    loading: false,
    errors: {}
};

function cloneState(state) {
    newState = update(state, {
        errors: {$set: {}}
    });

    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_TO_CART_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case ADD_TO_CART_SUCCESS:
            state = cloneState(state);
            carts = state.carts;
            cart = action.payload.entities.carts[action.payload.result];

            newState = update(state, {
                carts: {entities: {[cart.id]: {$set: cart}}, ids: {$unshift: [cart.id]}},
                count: {$set: action.payload.count},
                loading: {$set: false},
            });
            return newState;

        case ADD_TO_CART_FAIL:
            state = cloneState(state);
            return state;

        case LOAD_CART_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case LOAD_CART_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                carts: {$set: {entities: action.payload.entities.carts || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false},
            });
            return newState;

        case LOAD_CART_FAIL:
            state = cloneState(state);
            return state;

        case REMOVE_FROM_CART_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case REMOVE_FROM_CART_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                carts: {$set: {entities: action.payload.entities.carts || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false}
            });
            return newState;

        case REMOVE_FROM_CART_FAIL:
            state = cloneState(state);
            return state;

        case BUY_FROM_CART_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case BUY_FROM_CART_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                carts: {$set: {entities: {}, ids: []}},
                count: {$set: 0},
                loading: {$set: false}
            });
            return newState;

        case BUY_FROM_CART_FAIL:
            state = cloneState(state);
            return state;



        default:
            return state;
    }




}