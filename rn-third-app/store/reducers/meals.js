import { MEALS } from '../../data/dummy';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';


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

        case SET_FILTERS:
            const filters = action.filters;

            const filteredMeals = state.all.filter((meal) => {
                if (filters.isGlutenFree && ! meal.isGlutenFree) {
                    return false;
                }

                if (filters.isVegan && ! meal.isVegan)  {
                    return false;
                }

                if (filters.isVegetarian && ! meal.isVegetarian)  {
                    return false;
                }

                if (filters.isLactoseFree && ! meal.isLactoseFree)  {
                    return false;
                }

                return true;
            });

            state = {...state, filtered: filteredMeals}
            break;
    }

    return state;
};

export default mealsReducer;
