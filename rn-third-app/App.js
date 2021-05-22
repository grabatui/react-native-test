import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import CategroriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FiltersScreen from './screens/FiltersScreen';
import MealScreen from './screens/MealScreen';

import HeaderButton from './components/HeaderButton';

import colors from './constants/colors';


const MealsNavigator = createStackNavigator();
const MealsTabNavigator = createBottomTabNavigator();

enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

const DefaultStackNavigator = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    if ( ! fontLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(error) => console.error(error)}
        />
    }

    return (
        <MealsNavigator.Navigator
            initialRouteName="Categories"
            screenOptions={{
                headerStyle: styles.headerBar,
                headerTintColor: Platform.OS == 'android' ? 'white' : colors.primaryColor,
            }}
        >
            <MealsNavigator.Screen name="Categories" component={CategroriesScreen} />

            <MealsNavigator.Screen
                name="CategoryMeals"
                component={CategoryMealsScreen}
                options={({ route }) => ({
                    title: route.params.category.title,
                })}
            />

            <MealsNavigator.Screen
                name="Meal"
                component={MealScreen}
                options={({ route }) => ({
                    title: route.params.meal.title,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Favorite'
                                iconName='ios-star'
                                onPress={() => {
                                    console.log('Favorite!');
                                }}
                            />
                        </HeaderButtons>
                    ),
                })}
            />

            <MealsNavigator.Screen name="Filters" component={FiltersScreen} />
        </MealsNavigator.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <MealsTabNavigator.Navigator
                tabBarOptions={{
                    activeTintColor: colors.accentColor,
                }}
            >
                <MealsTabNavigator.Screen
                    name="Default"
                    component={DefaultStackNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name='ios-restaurant' size={25} color={color} />
                        ),
                    }}
                />

                <MealsTabNavigator.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name='ios-star' size={25} color={color} />
                        ),
                    }}
                />
            </MealsTabNavigator.Navigator>
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
    headerBar: {
        backgroundColor: Platform.OS == 'android' ? colors.primaryColor : 'white',
    },
});
