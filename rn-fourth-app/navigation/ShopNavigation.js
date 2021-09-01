import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductListScreen from '../screens/shop/ProductListScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductListScreen from '../screens/user/ProductListScreen';
import UserProductEditScreen from '../screens/user/ProductEditScreen';
import AuthScreen from '../screens/user/AuthScreen';

import HeaderButton from '../components/HeaderButton';
import OpenDrawerIcon from '../components/OpenDrawerIcon';

import colors from '../constants/colors';


const Stack = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

const getDefaultScreenOptions = () => ({
    headerStyle: styles.wrapperHeader,
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    headerTitleStyle: styles.headerBarTitle,
    headerBackTitleStyle: styles.headerBarBackTitle,
});

const getDefaultScreenOptionsWithDrawer = (navigation) => ({
    ...getDefaultScreenOptions(),
    headerLeft: () => (
        <OpenDrawerIcon navigation={navigation} />
    ),
});

const ProductsNavigator = ({ navigation }) => (
    <Stack.Navigator
        initialRouteName="Products"
        screenOptions={getDefaultScreenOptionsWithDrawer(navigation)}
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
);

const OrdersNavigator = ({ navigation }) => (
    <Stack.Navigator
        initialRouteName="Orders"
        screenOptions={getDefaultScreenOptionsWithDrawer(navigation)}
    >
        <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
                headerTitle: 'Orders',
            }}
        />
    </Stack.Navigator>
);

const AdminNavigator = ({ navigation }) => (
    <Stack.Navigator
        initialRouteName="UserProducts"
        screenOptions={getDefaultScreenOptionsWithDrawer(navigation)}
    >
        <Stack.Screen
            name="UserProducts"
            component={UserProductListScreen}
            options={{
                headerTitle: 'Your products',
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Add"
                            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            onPress={() => navigation.navigate('UserProductEdit', {title: 'New product'})}
                        />
                    </HeaderButtons>
                ),
            }}
        />

        <Stack.Screen
            name="UserProductEdit"
            component={UserProductEditScreen}
            options={({ route }) => ({
                headerTitle: route.params.title,
                headerRight: () => {
                    const onSubmit = route.params.onSubmit;

                    return (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title="Add"
                                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                                onPress={onSubmit}
                            />
                        </HeaderButtons>
                    );
                },
            })}
        />
    </Stack.Navigator>
);

const AuthNavigator = ({ navigation }) => (
    <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={getDefaultScreenOptions()}
    >
        <Stack.Screen
            name="SignIn"
            component={AuthScreen}
            options={{
                headerTitle: 'Authenticate',
            }}
        />
    </Stack.Navigator>
);

const ShopNavigation = () => (
    <NavigationContainer>
        {true
            ? <AuthNavigator />
            : <DrawerNavigator.Navigator
                drawerContentOptions={{
                    activeTintColor: colors.primary,
                }}
            >
                <DrawerNavigator.Screen
                    name="Products"
                    component={ProductsNavigator}
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                <DrawerNavigator.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                <DrawerNavigator.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </DrawerNavigator.Navigator>
        }
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
