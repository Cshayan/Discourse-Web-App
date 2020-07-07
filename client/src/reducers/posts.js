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

const initialState = {
    posts: [],
    loading: true,
    createPost: null
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload.data,
                    loading: false
            }
            case GET_POSTS_ERR:
                return {
                    ...state,
                    loading: false
                }
                case CREATE_POST:
                    return {
                        ...state,
                        createPost: payload.data
                    }
                    case CREATE_POST_ERR:
                        return {
                            ...state,
                            createPost: null
                        }
                        case DELETE_POST:
                            return {
                                ...state,
                                posts: state.posts.filter(post => post._id !== payload)
                            }
                            case UPDATE_POST:
                            case UPDATE_POST_ERR:
                            case DELETE_POST_ERR:
                            default:
                                return state
    }
}