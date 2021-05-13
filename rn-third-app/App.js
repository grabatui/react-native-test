import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategroriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FiltersScreen from './screens/FiltersScreen';
import MealScreen from './screens/MealScreen';


const MealsNavigator = createStackNavigator();


const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if ( ! fontLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(error) => console.error(error)}
        />
    }

    return (
        <NavigationContainer>
            <MealsNavigator.Navigator initialRouteName="Categories">
                <MealsNavigator.Screen name="Categories" component={CategroriesScreen} />
                <MealsNavigator.Screen name="CategoryMeals" component={CategoryMealsScreen} />
                <MealsNavigator.Screen name="Favorites" component={FavoritesScreen} />
                <MealsNavigator.Screen name="Filters" component={FiltersScreen} />
                <MealsNavigator.Screen name="Meal" component={MealScreen} />
            </MealsNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
