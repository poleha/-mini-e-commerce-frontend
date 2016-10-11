import {LOAD_PRODUCTS_START, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAIL} from '../constants/Product'
import update from 'react-addons-update'
var newState;

const initialState = {
    path: null,
    products: null,
    count: 0,
    loading: false,
    errors: {},
    query: null
};

function cloneState(state) {
    newState = update(state, {
        errors: {$set: {}}
    });

    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_PRODUCTS_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case LOAD_PRODUCTS_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                products: {$set: {entities: action.payload.entities.products || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false},
                path: {$set: action.path},
                query: {$set: action.query}
            });
            return newState;

        case LOAD_PRODUCTS_FAIL:
            state = cloneState(state);
            return state;

        default:
            return state;
    }




}