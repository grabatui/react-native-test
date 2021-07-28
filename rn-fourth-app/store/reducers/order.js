import { Order } from "../../models/order";
import { ADD_ORDER } from "../actions/order";

const initialState = {
    all: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const { cartItems, totalAmount } = action;

            const order = new Order(
                cartItems,
                totalAmount,
                new Date()
            );

            order.id = new Date().getTime();

            state.all.push(order);
            break;
    }

    return {
        ...state,
        all: [...state.all],
    };
};
