import React from 'react';
import { TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';


const MapPreview = ({ longitude, latitude, children, style, onPressed }) => {
    const imagePreviewUrl = longitude && latitude
        ? `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=14&l=map&size=400,200&pt=${longitude},${latitude},pm2rdm`
        : null;

    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <TouchableComponent onPress={onPressed} style={{...styles.wrapper, ...style}}>
            {imagePreviewUrl
                ? <Image
                    style={styles.image}
                    source={{uri: imagePreviewUrl}}
                />
                : children}
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default MapPreview;
