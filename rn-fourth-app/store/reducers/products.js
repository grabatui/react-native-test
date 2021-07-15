import { PRODUCTS } from '../../data/dummy';


const initialState = {
    available: PRODUCTS,
    byUser: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    return state;
};
