import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import colors from "../constants/colors";


const ImageSelector = () => {
    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Error!',
                'Sorry, we need camera permissions to make this work!',
                [
                    {text: 'Okay'},
                ]
            );

            return false;
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
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

        await ImagePicker.launchCameraAsync({
            
        });
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.previewText}>
                <Text>Not image picked yet</Text>

                <Image
                    style={styles.image}
                />
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
    },
    previewText: {
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
