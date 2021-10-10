import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';


const MapScreen = ({ route, navigation }) => {
    let initialCoordinates = route.params.coordinates;

    if (! initialCoordinates.longitude || ! initialCoordinates.latitude) {
        initialCoordinates = {
            latitude: 37.78825,
            longitude: -122.4324,
        };
    }

    const [selectedLocation, setSelectedLocation] = useState(initialCoordinates);

    const onPressed = ({ nativeEvent }) => {
        setSelectedLocation({
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude,
        });
    };

    const onSavePressed = useCallback(
        () => {
            if (! selectedLocation) {
                return;
            }

            navigation.navigate('EditPlace', {selectedLocation});
        },
        [selectedLocation]
    );

    useEffect(
        () => navigation.setParams({onSavePressed}),
        [onSavePressed]
    );

    return (
        <MapView
            region={{
                ...selectedLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={styles.map}
            onPress={onPressed}
        >
            {selectedLocation && (
                <Marker
                    title="Selected location"
                    coordinate={selectedLocation}
                />
            )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default MapScreen;
