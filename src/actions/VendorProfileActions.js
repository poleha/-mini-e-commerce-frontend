import { LOAD_VENDOR_PROFILES_START, LOAD_VENDOR_PROFILES_SUCCESS, LOAD_VENDOR_PROFILES_FAIL } from '../constants/VendorProfile'
import { API_KEY } from '../middleware/api'
import { vendorProfile } from '../schemas'
import { apiHost} from '../helpers/helper'

const endpoint = apiHost + '/vendor_profiles/';


export function loadVendorProfiles(id) {
    return function (dispatch, getState) {
        let loading = getState().vendorProfile.loading;
        if (!loading) {
        let currentEndpoint = endpoint;
        if ( id ) currentEndpoint += `${id}/`
        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: currentEndpoint,
                schema: vendorProfile,
                actions: [LOAD_VENDOR_PROFILES_START, LOAD_VENDOR_PROFILES_SUCCESS, LOAD_VENDOR_PROFILES_FAIL]
            },
        }
        return dispatch(action);
    }
    }
}



