export const ADD_ORDER = 'ADD_ORDER';


export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch) => {
        const date = new Date();

        const response = await fetch(
            'https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                }),
            }
        );

        if ( ! response.ok) {
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();

        dispatch({
            type: ADD_ORDER,
            id: responseData.name,
            cartItems,
            totalAmount,
            date,
        });
    };
};
