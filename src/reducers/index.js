/* *
*  REDUX SETUP (1)
*/
import { combineReducers } from "redux";
import { authReducer } from './authReducer';


export const rootReducer = combineReducers({
    auth: authReducer
});

