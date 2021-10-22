import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import PlacesScreen from '../screens/PlacesScreen';
import PlaceScreen from '../screens/PlaceScreen';
import EditPlaceScreen from '../screens/EditPlaceScreen';
import MapScreen from '../screens/MapScreen';

import HeaderButton from '../components/HeaderButton';

import colors from '../constants/colors';


const Stack = createStackNavigator();

const PlacesNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Places"
            screenOptions={{
                headerStyle: styles.wrapperHeader,
                headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
            }}
        >
            <Stack.Screen
                name="Places"
                component={PlacesScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Places',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title="Add place"
                                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                onPress={() => navigation.navigate('EditPlace')}
                            />
                        </HeaderButtons>
                    ),
                })}
            />

            <Stack.Screen
                name="Place"
                component={PlaceScreen}
                options={({ route }) => ({
                    headerTitle: route.params.data.title,
                })}
            />

            <Stack.Screen
                name="EditPlace"
                component={EditPlaceScreen}
                options={() => ({
                    headerTitle: 'Edit place',
                })}
            />

            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={({ route }) => ({
                    headerTitle: 'Map',
                    headerRight: () => {
                        const onPressed = route.params.onSavePressed;
                        const readonly = route.params.readonly;

                        if (readonly) {
                            return;
                        }

                        return (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title="Save location"
                                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                                    onPress={onPressed}
                                />
                            </HeaderButtons>
                        );
                    },
                })}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    wrapperHeader: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    },
});

export default PlacesNavigator;
