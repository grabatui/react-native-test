import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";


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
    }

    return {
        ...state,
        totalAmount: state.totalAmount.toFixed(2)
    };
};
