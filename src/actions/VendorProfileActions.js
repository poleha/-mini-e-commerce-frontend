import { LOAD_VENDOR_PROFILES_START, LOAD_VENDOR_PROFILES_SUCCESS, LOAD_VENDOR_PROFILES_FAIL } from '../constants/VendorProfile'
import { API_KEY } from '../middleware/api'
import { vendorProfile } from '../schemas'
import { serializeParams, apiHost} from '../helpers/helper'

const endpoint = apiHost + '/vendor_profiles/';


export function loadVendorProfiles(params) {
    return function (dispatch, getState) {
        let loading = getState().vendorProfile.loading;
        if (!loading) {
        let urlParams = '';
        if (params) {
            if (params.body == null) {
                delete params.body;
            }
            urlParams = serializeParams(params);
        }

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint + '?' + urlParams,
                schema: vendorProfile,
                actions: [LOAD_VENDOR_PROFILES_START, LOAD_VENDOR_PROFILES_SUCCESS, LOAD_VENDOR_PROFILES_FAIL]
            },
        }
        return dispatch(action);
    }
    }
}



