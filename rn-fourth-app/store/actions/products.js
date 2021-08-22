import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = (id) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
            {method: 'DELETE'}
        );

        if ( ! response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch({
            type: DELETE_PRODUCT,
            id,
        });
    };
};

export const createProduct = (data) => {
    return async (dispatch) => {
        const response = await fetch(
            'https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/products.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if ( ! response.ok) {
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();

        data.id = responseData.name;

        dispatch({
            type: CREATE_PRODUCT,
            data,
        });
    };
};

export const updateProduct = (id, data) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    imageUrl: data.imageUrl,
                    description: data.description,
                }),
            }
        );

        if ( ! response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            id,
            data,
        });
    };
};

export const setProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                'https://react-test-fourth-shop-default-rtdb.europe-west1.firebasedatabase.app/products.json'
            );

            if ( ! response.ok) {
                throw new Error('Something went wrong');
            }
    
            const responseData = await response.json();
    
            const products = [];
            for (const code in responseData) {
                products.push(Product.make({
                    ...responseData[code],
                    id: code,
                    ownerId: 'u1',
                }));
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products,
            });
        } catch (error) {
            console.error(error);

            throw error;
        }
    };
};
