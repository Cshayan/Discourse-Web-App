/* File for setting the header with token */

import axios from 'axios';

// function
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}