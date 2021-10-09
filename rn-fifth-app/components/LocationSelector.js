import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

import colors from '../constants/colors'
import MapPreview from './MapPreview';


const LocationSelector = ({ onLocationSelected, navigation }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
        longitude: null,
        latitude: null,
    });

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Error!',
                'Sorry, we need location permissions to make this work!',
                [
                    {text: 'Okay'},
                ]
            );

            return false;
        }

        return true;
    };

    const onGetUserLocationPress = async () => {
        const hasPermission = await verifyPermissions();

        if ( ! hasPermission) {
            return;
        }

        try {
            setIsFetching(true);

            const location = await Location.getCurrentPositionAsync({
                timeInterval: 5000,
            });

            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            Alert.alert(
                'Error!',
                'Please try again later',
                [
                    {text: 'Okay'},
                ]
            );
        }

        setIsFetching(false);
    };

    const onPickOnMapPress = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.wrapper}>
            <MapPreview
                style={styles.image}
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
                onPressed={onPickOnMapPress}
            >
                {isFetching
                    ? <ActivityIndicator
                        size="large"
                        color={colors.primary}
                    />
                    : <Text>No location selected yet!</Text>}
            </MapPreview>

            <View style={styles.actions}>
                <Button
                    title="Get User Location"
                    color={colors.primary}
                    onPress={onGetUserLocationPress}
                />
                <Button
                    title="Pick on map"
                    color={colors.primary}
                    onPress={onPickOnMapPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 15,
    },
    image: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default LocationSelector;
