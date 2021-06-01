import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';


const FavoriesScreen = ({ navigation }) => {
    const favoriteMeals = useSelector((state) => state.meals.favorites);

    return (
        <MealList
            meals={favoriteMeals}
            onPressMeal={(data) => {
                navigation.navigate('Meal', {
                    meal: data.item
                });
            }}
        />
    )
};

export default FavoriesScreen;
