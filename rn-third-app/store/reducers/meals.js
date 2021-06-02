import { MEALS } from '../../data/dummy';
import { TOGGLE_FAVORITE } from '../actions/meals';


const initialState = {
    all: MEALS,
    filtered: MEALS,
    favorites: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existsMealIndex = state.favorites.findIndex(
                (meal) => meal.id === action.mealId
            );

            if (existsMealIndex >= 0) {
                const favorites = [...state.favorites];
                favorites.splice(existsMealIndex, 1);

                state = {...state, favorites}
            } else {
                const favoriteMeal = state.all.find(
                    (meal) => meal.id === action.mealId
                );

                state = {...state, favorites: state.favorites.concat(favoriteMeal)}
            }
            break;
    }

    return state;
};

export default mealsReducer;
