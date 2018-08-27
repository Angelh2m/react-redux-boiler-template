import { GET_ERRORS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export const errorReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        default:
            return state
    }
}