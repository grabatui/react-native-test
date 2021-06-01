import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';


const CategoryMealsScreen = ({ navigation, route }) => {
    const availableMeals = useSelector((state) => state.meals.filtered);

    const categoryMeals = availableMeals.filter((meal) => {
        return meal.categoriesIds.indexOf(route.params.category.id) >= 0;
    });

    return (
        <MealList
            meals={categoryMeals}
            onPressMeal={(data) => {
                navigation.navigate('Meal', {
                    meal: data.item
                });
            }}
        />
    )
};

export default CategoryMealsScreen;
