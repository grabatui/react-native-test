import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import CategroriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FiltersScreen from './screens/FiltersScreen';
import MealScreen from './screens/MealScreen';

import HeaderButton from './components/HeaderButton';
import OpenDrawerIcon from './components/OpenDrawerIcon';

import colors from './constants/colors';


const MealsNavigator = createStackNavigator();

enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

const mealNavigatorScreenProperties = {
    name: 'Meal',
    component: MealScreen,
    options: ({ route }) => ({
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
    })
}

const DefaultStackNavigator = ({ navigation }) => {
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
                headerLeft: () => (
                    <OpenDrawerIcon navigation={navigation} />
                ),
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

            <MealsNavigator.Screen {...mealNavigatorScreenProperties} />

            <MealsNavigator.Screen name="Filters" component={FiltersScreen} />
        </MealsNavigator.Navigator>
    );
};

const FavoritesStackNavigator = ({ navigation }) => {
    return (
        <MealsNavigator.Navigator
            initialRouteName="Your favorites"
            screenOptions={{
                headerStyle: styles.headerBar,
                headerTintColor: Platform.OS == 'android' ? 'white' : colors.primaryColor,
                headerLeft: () => (
                    <OpenDrawerIcon navigation={navigation} />
                ),
            }}
        >
            <MealsNavigator.Screen name="Your favorites" component={FavoritesScreen} />

            <MealsNavigator.Screen {...mealNavigatorScreenProperties} />
        </MealsNavigator.Navigator>
    );
};


const MealsTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const tabNavigatorProperties = Platform.OS === 'android'
    // For material-bottom-tabs
    ? {
        activeColor: 'white',
        shifting: true,
    }
    // For bottom-tabs
    : {
        tabBarOptions: {
            activeTintColor: colors.accentColor,
        },
    };

const MealsTabNavigatorScreen = () => (
    <MealsTabNavigator.Navigator {...tabNavigatorProperties}>
        <MealsTabNavigator.Screen
            name="Default"
            component={DefaultStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name='ios-restaurant' size={25} color={color} />
                ),
                tabBarColor: colors.primaryColor,
            }}
        />

        <MealsTabNavigator.Screen
            name="Favorites"
            component={FavoritesStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name='ios-star' size={25} color={color} />
                ),
                tabBarColor: colors.accentColor,
            }}
        />
    </MealsTabNavigator.Navigator>
);


const FiltersStackNavigator = () => {
    return (
        <MealsNavigator.Navigator
            initialRouteName="Filters"
            screenOptions={{
                headerStyle: styles.headerBar,
                headerTintColor: Platform.OS == 'android' ? 'white' : colors.primaryColor,
                headerLeft: () => (
                    <OpenDrawerIcon navigation={navigation} />
                ),
            }}
        >
            <MealsNavigator.Screen name="Filters" component={FiltersScreen} />
        </MealsNavigator.Navigator>
    );
};


const DrawerNavigator = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigator.Navigator>
                <DrawerNavigator.Screen name='Main' component={MealsTabNavigatorScreen} />

                <DrawerNavigator.Screen name='Filters' component={FiltersStackNavigator} />
            </DrawerNavigator.Navigator>
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
