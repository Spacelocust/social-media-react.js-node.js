import * as api from '../api';
import { ACTION_TYPES } from '../constants/actionTypes';

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: ACTION_TYPES.AUTH, data});

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: ACTION_TYPES.AUTH, data});

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}