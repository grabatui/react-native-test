import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';


const initialState = {
    available: [],
    byUser: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            state.byUser = state.byUser.filter((product) => product.id !== action.id);
            break;

        case CREATE_PRODUCT:
            const addProduct = new Product();
            addProduct.id = action.data.id;
            addProduct.ownerId = action.data.ownerId;
            addProduct.title = action.data.title;
            addProduct.imageUrl = action.data.imageUrl;
            addProduct.description = action.data.description;
            addProduct.price = action.data.price;

            state.available.push(addProduct);
            state.byUser.push(addProduct);
            break;

        case UPDATE_PRODUCT:
            const updateProduct = state.byUser.find((product) => product.id === action.id);

            if (updateProduct) {
                updateProduct.title = action.data.title;
                updateProduct.imageUrl = action.data.imageUrl;
                updateProduct.description = action.data.description;
            }
            break;

        case SET_PRODUCTS:
            state = {
                ...state,
                available: action.products,
                byUser: action.userProducts,
            }
            break;
    }

    return {
        ...state,
        byUser: [...state.byUser],
        available: [...state.available],
    };
};
