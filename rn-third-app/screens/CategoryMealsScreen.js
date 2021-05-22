import React from 'react';

import { MEALS } from '../data/dummy';

import MealList from '../components/MealList';


const CategoryMealsScreen = ({ navigation, route }) => {
    const categoryMeals = MEALS.filter((meal) => {
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
