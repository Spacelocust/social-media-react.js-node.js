import { ACTION_TYPES } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return action.payload;
        case ACTION_TYPES.UPDATE:
            return posts.map((p) => p._id === action.payload._id ? action.payload : posts);
        case ACTION_TYPES.DELETE:
            return posts.filter((p) => p._id !== action.payload);
        case ACTION_TYPES.CREATE:
            return [...posts, action.payload];
        default :
            return posts
    }
}
