import { SET_CURRENT_USER } from "../actions/types";
import { isEmpty } from '../validation/is-empty';

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
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}