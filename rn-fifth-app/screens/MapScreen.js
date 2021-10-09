import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';


const MapScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState();

    const onPressed = ({ nativeEvent }) => {
        setSelectedLocation({
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude,
        });
    };

    return (
        <MapView
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
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
