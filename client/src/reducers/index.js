import {
    combineReducers
} from 'redux';
import auth from './auth';
import alert from './alert';
import posts from './posts';

export default combineReducers({
    auth,
    alert,
    posts
});