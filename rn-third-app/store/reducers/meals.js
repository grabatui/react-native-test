import { MEALS } from '../../data/dummy';


const initialState = {
    all: MEALS,
    filtered: MEALS,
    favorites: []
};

const mealsReducer = (state = initialState, action) => {
    return state;
};

export default mealsReducer;
