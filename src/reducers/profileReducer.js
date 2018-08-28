
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, PROFILE_LOADING } from '../actions/types';

// This will be inside profile from rootReducer
const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export const profileReducer = function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}