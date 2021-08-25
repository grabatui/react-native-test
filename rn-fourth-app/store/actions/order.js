import { Order } from "../../models/order";


export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch) => {
        const date = new Date();

        const response = await fetch(
            'https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json',
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

export const setOrders = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                'https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json'
            );

            if ( ! response.ok) {
                throw new Error('Something went wrong');
            }
    
            const responseData = await response.json();
    
            let order, orderData;
            const orders = [];
            for (const code in responseData) {
                orderData = responseData[code];

                order = new Order(
                    orderData.cartItems,
                    orderData.totalAmount,
                    new Date(orderData.date)
                );

                order.id = code;

                orders.push(order);
            }

            dispatch({
                type: SET_ORDERS,
                orders,
            });
        } catch (error) {
            console.error(error);

            throw error;
        }
    };
};
