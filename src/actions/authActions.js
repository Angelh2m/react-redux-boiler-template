/* *
*  Register User || Action creator  => TEST_DISPATCH
*/
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";



export const registerUser = (userData, history) => (dispatch) => {

    axios.post('/api/users/register', userData)
        .then(res => history.push('login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = (userData) => (dispatch) => {
    axios.post('/api/users/login', userData)
        .then(res => {

            const { token } = res.data;
            // Set the token in local storage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth Header for all axios requests
            setAuthToken(token);
            // Decode Token to get user data
            const decoded = jwt_decode(token);
            // Set current user

            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove the header from future request
    setAuthToken(false);
    // Set the current user to empty object and isAuthenticated to FALSE
    dispatch(setCurrentUser({}));
    // window.location.href = '/';
}