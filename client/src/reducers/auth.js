/* Reducer file for handling user authentication */

// Constants
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_LOADED_FAIL,
    LOGIN_SUCCESS,
    TOKEN,
    LOGIN_FAIL,
    LOGOUT
} from '../constants/constants';

// Inital State
const initialState = {
    token: localStorage.getItem(TOKEN),
    isAuthenticated: null,
    isLoading: true,
    user: null
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    isLoading: false,
                    user: payload.data
            }
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                localStorage.setItem(TOKEN, payload.token);
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                        isLoading: false
                }
                case REGISTER_FAIL:
                case USER_LOADED_FAIL:
                case LOGIN_FAIL:
                case LOGOUT:
                    localStorage.removeItem(TOKEN);
                    return {
                        ...state,
                        isAuthenticated: false,
                            isLoading: false
                    }
                    default:
                        return state;
    }
}