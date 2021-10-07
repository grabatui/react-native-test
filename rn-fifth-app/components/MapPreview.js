import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const MapPreview = ({ longitude, latitude, children, style }) => {
    const imagePreviewUrl = longitude && latitude
        ? `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=14&l=map&size=400,200&pt=${longitude},${latitude},pm2rdm`
        : null;

    return (
        <View style={{...style, ...styles.wrapper}}>
            {imagePreviewUrl
                ? <Image
                    style={styles.image}
                    source={{uri: imagePreviewUrl}}
                />
                : children}
        </View>
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
