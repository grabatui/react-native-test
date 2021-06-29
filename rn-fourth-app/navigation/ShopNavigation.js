import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductListScreen from '../screens/shop/ProductListScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

import HeaderButton from '../components/HeaderButton';

import colors from '../constants/colors';


const Stack = createStackNavigator();

const ShopNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Products"
            screenOptions={{
                headerStyle: styles.wrapperHeader,
                headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
                headerTitleStyle: styles.headerBarTitle,
                headerBackTitleStyle: styles.headerBarBackTitle,
            }}
        >
            <Stack.Screen
                name="Products"
                component={ProductListScreen} 
                options={({ navigation }) => ({
                    headerTitle: 'All products',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title="Cart"
                                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                onPress={() => navigation.navigate('Cart')}
                            />
                        </HeaderButtons>
                    )
                })}
            />

            <Stack.Screen
                name="Product"
                component={ProductDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.data.title,
                })}
            />

            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    headerTitle: 'Cart',
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    wrapperHeader: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    },
    headerBarTitle: {
        fontFamily: 'open-sans-bold',
    },
    headerBarBackTitle: {
        fontFamily: 'open-sans',
    },
});

export default ShopNavigation;
