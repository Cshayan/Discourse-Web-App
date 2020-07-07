import {
    GET_POSTS,
    GET_POSTS_ERR,
    CREATE_POST,
    CREATE_POST_ERR,
    DELETE_POST,
    DELETE_POST_ERR,
    UPDATE_POST,
    UPDATE_POST_ERR
} from '../constants/constants';
import {
    notifier
} from '../utils/notification';
import axios from 'axios';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: GET_POSTS_ERR
        })
    }
}

export const createPost = ({
    title,
    description
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        title,
        description
    });

    try {
        const res = await axios.post('/api/v1/posts', body, config);

        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
        dispatch(getPosts());
        // dispatch(setAlert('success', res.data.msg));
        notifier('Success', res.data.msg, 'success');
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: CREATE_POST_ERR
        })
    }
}

export const deletePost = ({
    _id
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`/api/v1/posts/${_id}`, config);
        dispatch({
            type: DELETE_POST,
            payload: _id
        });
        // dispatch(setAlert('success', res.data.msg));
        notifier('Success', res.data.msg, 'success');
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: DELETE_POST_ERR
        });
    }
}

export const updatePost = ({
    updatedTitle,
    updatedDesc,
    _id
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        title: updatedTitle,
        description: updatedDesc
    });

    try {
        const res = await axios.put(`/api/v1/posts/${_id}`, body, config);
        dispatch({
            type: UPDATE_POST
        });
        // dispatch(setAlert('success', res.data.msg));
        notifier('Success', res.data.msg, 'success');
        dispatch(getPosts());
    } catch (err) {
        if (err.response.data.error) {
            // dispatch(setAlert('danger', err.response.data.error));
            notifier('Error', err.response.data.error, 'danger');
        }
        dispatch({
            type: UPDATE_POST_ERR
        });
        dispatch(getPosts());
    }
}