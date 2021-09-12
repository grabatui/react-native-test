import { GOOGLE_FIREBASE_API_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let autoLogoutTimer;

export const signUp = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + GOOGLE_FIREBASE_API_KEY,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const signUpData = await response.json();

        if ( ! response.ok) {
            const errorCode = signUpData.error.message;

            let errorMessage = 'Something went wrong!';
            switch (errorCode) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already!';
                    break;
            }

            throw new Error(errorMessage);
        }

        dispatch(
            authenticate(signUpData.idToken, signUpData.localId, parseInt(signUpData.expiresIn) * 1000)
        )

        saveAuthUserDataToStorage(signUpData.idToken, signUpData.localId, signUpData.expiresIn);
    };
};

export const signIn = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + GOOGLE_FIREBASE_API_KEY,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const signInData = await response.json();

        if ( ! response.ok) {
            const errorCode = signInData.error.message;

            let errorMessage = 'Something went wrong!';
            switch (errorCode) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email could not be found!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not valid!';
                    break;
            }

            throw new Error(errorMessage);
        }

        dispatch(
            authenticate(signInData.idToken, signInData.localId, parseInt(signInData.expiresIn) * 1000)
        )

        saveAuthUserDataToStorage(signInData.idToken, signInData.localId, signInData.expiresIn);
    };
};

export const authenticate = (token, userId, expirationTime) => {
    return (dispatch) => {
        dispatch(
            setLogoutTimer(expirationTime)
        );

        dispatch({
            type: AUTHENTICATE,
            token,
            userId,
        });
    };
};

export const logout = () => {
    clearLogoutTimer();

    AsyncStorage.removeItem('authUserData');

    return {
        type: LOGOUT,
    };
};

const saveAuthUserDataToStorage = (token, userId, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + (parseInt(expiresIn) * 1000)).toISOString();

    AsyncStorage.setItem(
        'authUserData',
        JSON.stringify({
            token,
            userId,
            expirationDate,
        })
    );
};

const clearLogoutTimer = () => {
    if (autoLogoutTimer) {
        clearTimeout(autoLogoutTimer);
    }
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        autoLogoutTimer = setTimeout(
            () => dispatch(logout()),
            expirationTime
        );
    };
};
