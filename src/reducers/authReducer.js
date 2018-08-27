
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
        default:
            return state
    }
}