import { ACTION_TYPES } from '../constants/actionTypes';

export default (auth = { authData: null }, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));

            return { ...auth, authData: action.data };
        case ACTION_TYPES.LOGOUT:
            localStorage.clear();

            return { ...auth, authData: null};
        default :
            return auth
    }
};
