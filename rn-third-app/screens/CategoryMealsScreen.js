import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';


const CategoryMealsScreen = ({ navigation, route }) => {
    const availableMeals = useSelector((state) => state.meals.filtered);
    const favoriteMeals = useSelector((state) => state.meals.favorites);

    const categoryMeals = availableMeals.filter((meal) => {
        return meal.categoriesIds.indexOf(route.params.category.id) >= 0;
    });

    return (
        <MealList
            meals={categoryMeals}
            onPressMeal={(data) => {
                const isMealFavorite = favoriteMeals.some((favoriteMeal) => favoriteMeal.id === data.item.id);

                navigation.navigate('Meal', {
                    meal: data.item,
                    isMealFavorite
                });
            }}
        />
    )
};

export default CategoryMealsScreen;
