export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        id,
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

        const responseData = await response.json();

        data.id = responseData.name;

        dispatch({
            type: CREATE_PRODUCT,
            data,
        });
    };
};

export const updateProduct = (id, data) => {
    return {
        type: UPDATE_PRODUCT,
        id,
        data,
    };
};
