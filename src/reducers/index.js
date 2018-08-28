/* *
*  REDUX SETUP (1)
*/
import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { profileReducer } from './profileReducer';

// Main reducer !! Access from mapToProps from component

export const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});

