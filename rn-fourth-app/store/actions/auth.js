import { GOOGLE_FIREBASE_API_KEY } from '@env'


export const SIGN_UP = 'SUGN_UP';
export const SIGN_IN = 'SIGN_IN';

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

        if ( ! response.ok) {
            throw new Error('Something went wrong!');
        }

        const signUpData = await response.json();
console.log(signUpData);
        dispatch({
            type: SIGN_UP,
        });
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

        if ( ! response.ok) {
            throw new Error('Something went wrong!');
        }

        const signInData = await response.json();
console.log(signInData);
        dispatch({
            type: SIGN_IN,
        });
    };
};
