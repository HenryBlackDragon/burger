import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkAMJkHz4kzEc1ljJKBE13VpoRogPAz20";

        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkAMJkHz4kzEc1ljJKBE13VpoRogPAz20";
        }

        axios.post(url, authData)
            .then(repsonse => {
                console.log(repsonse);
                dispatch(authSuccess(repsonse.data.idToken, repsonse.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.repsonse.data.error));
            });
    };
};