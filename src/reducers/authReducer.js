import { TEST_DISPATCH } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

/* *
*  MODIFY THE REDUCER STATE BY ACTIONS
*/

// 1. Connect from component will come to the reducer

export const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}