import { PRODUCTS } from '../../data/dummy';
import { DELETE_PRODUCT } from '../actions/products';


const initialState = {
    available: PRODUCTS,
    byUser: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            state.byUser = state.byUser.filter((product) => product.id !== action.id);
            break;
    }

    return state;
};
