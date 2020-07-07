/* Action file for handling user authentication */

// Dependencies
import axios from 'axios';
// Constants
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_LOADED_FAIL,
    TOKEN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../constants/constants';
import {
    notifier
} from '../utils/notification';
import {
    setAuthToken
} from '../utils/setAuthToken';

/*  Desc - Load User
 *  Endpoint - api/v1/users/auth
 *  Method - GET
 */
export const loadUser = () => async dispatch => {
    // if token exists, set to axios header
    if (localStorage.getItem(TOKEN)) {
        setAuthToken(localStorage.getItem(TOKEN));
    }

    try {
        const res = await axios.get('/api/v1/users/me');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}


/*  Desc - Register User
 *  Endpoint - api/v1/users/register 
 *  Method - POST
 */
export const registerUser = ({
    name,
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        name,
        email,
        password
    });

    try {
        const res = await axios.post('/api/v1/users/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

/*  Desc - Login User
 *  Endpoint - api/v1/users/auth/login
 *  Method - POST
 */
export const loginUser = ({
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post('/api/v1/users/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

/*
 *  Desc - Logout the user
 */
export const logOutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}