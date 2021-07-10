import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/order";


const initialState = {
    items: {},
    totalAmount: 0.0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { product } = action;

            if (state.items[product.id]) {
                state.items[product.id].quantity++;
            } else {
                state.items[product.id] = new CartItem(
                    product.id,
                    1,
                    product.price,
                    product.title
                );
            }

            state.totalAmount = parseFloat(state.totalAmount) + parseFloat(product.price);
            break;

        case REMOVE_FROM_CART:
            const { id } = action;

            if (state.items[id]) {
                const cartItem = state.items[id];

                state.totalAmount = parseFloat(state.totalAmount) - parseFloat(cartItem.price);

                if (cartItem.quantity <= 1) {
                    delete state.items[id];
                } else {
                    cartItem.quantity--;
                }
            }
            break;

        case ADD_ORDER:
            state.items = {};
            state.totalAmount = 0.0;
            break;
    }

    return {
        ...state,
        totalAmount: parseFloat(state.totalAmount).toFixed(2),
    };
};
