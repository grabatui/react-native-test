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
    return {
        type: CREATE_PRODUCT,
        data,
    };
};

export const updateProduct = (id, data) => {
    return {
        type: UPDATE_PRODUCT,
        id,
        data,
    };
};
