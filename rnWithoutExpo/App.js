/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { launchCamera } from 'react-native-image-picker';

const App: () => Node = () => {
    const onImagePress = async () => {
        const result = await launchCamera({
            cameraType: 'back',
        });

        console.log(result);
    };

    return (
        <View>
            <Button
                title="Take image"
                onPress={onImagePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
