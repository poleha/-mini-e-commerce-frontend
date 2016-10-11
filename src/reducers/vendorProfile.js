import {LOAD_VENDOR_PROFILES_START, LOAD_VENDOR_PROFILES_SUCCESS, LOAD_VENDOR_PROFILES_FAIL} from '../constants/VendorProfile'
import update from 'react-addons-update'
var vendorProfiles, vendorProfile, key, newState, errors;

const initialState = {
    path: null,
    vendorProfiles: null,
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
        case LOAD_VENDOR_PROFILES_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case LOAD_VENDOR_PROFILES_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                vendorProfiles: {$set: {entities: action.payload.entities.posts || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false},
                path: {$set: action.path},
                query: {$set: action.query}
            });
            return newState;
        case LOAD_VENDOR_PROFILES_FAIL:
            state = cloneState(state);
            return state;


        default:
            return state;
    }




}