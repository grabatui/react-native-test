import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import colors from "../constants/colors";


const ImageSelector = ({ initialValue, onImageSelected }) => {
    const [selectedImage, setSelectedImage] = useState(initialValue);

    const verifyPermissions = async () => {
        const cameraResult = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraResult.status !== 'granted') {
            Alert.alert(
                'Error!',
                'Sorry, we need camera permissions to make this work!',
                [
                    {text: 'Okay'},
                ]
            );

            return false;
        }

        const mediaLibraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (mediaLibraryResult.status !== 'granted') {
            Alert.alert(
                'Error!',
                'Sorry, we need camera roll permissions to make this work!',
                [
                    {text: 'Okay'},
                ]
            );

            return false;
        }

        return true;
    };

    const onPressButton = async () => {
        const hasPermission = await verifyPermissions();

        if ( ! hasPermission) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: .5,
        });

        if ( ! image.cancelled) {
            setSelectedImage(image.uri);

            onImageSelected(image.uri);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.previewImage}>
                {selectedImage
                    ? (
                        <Image
                            style={styles.image}
                            source={{uri: selectedImage}}
                        />
                    )
                    : (
                        <Text>Not image picked yet</Text>
                    )}
            </View>

            <Button
                title="Take image"
                color={colors.primary}
                onPress={onPressButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginBottom: 15,
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImageSelector;
