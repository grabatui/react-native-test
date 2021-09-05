export const SIGN_UP = 'SUGN_UP';


export const signUp = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIYcz_d9jDcm3x5UmetEczNHLsNM6z0O0',
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

        const sugnUpData = await response.json();

        dispatch({
            type: SIGN_UP,
        });
    };
};
