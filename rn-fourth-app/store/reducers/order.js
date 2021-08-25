import { Order } from "../../models/order";
import { ADD_ORDER } from "../actions/order";

const initialState = {
    all: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const { id, cartItems, totalAmount, date } = action;

            const order = new Order(
                cartItems,
                totalAmount,
                date
            );

            order.id = id;

            state.all.push(order);
            break;
    }

    return {
        ...state,
        all: [...state.all],
    };
};
