import React from 'react';
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native';

import MapPreview from '../components/MapPreview';
import colors from '../constants/colors';


const PlaceScreen = ({ route, navigation }) => {
    const place = route.params.data;

    const onMapPressed = () => {
        navigation.navigate('Map', {
            readonly: true,
            coordinates: {
                longitude: place.longitude,
                latitude: place.latitude,
            },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Image
                source={{uri: place.image}}
                style={styles.image}
            />

            <View style={styles.locationWrapper}>
                <View style={styles.addressWrapper}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>

                <MapPreview
                    longitude={place.longitude}
                    latitude={place.latitude}
                    styles={styles.mapPreview}
                    onPressed={onMapPressed}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc',
    },
    locationWrapper: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    addressWrapper: {
        padding: 20,
    },
    address: {
        color: colors.primary,
        textAlign: 'center',
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default PlaceScreen;
