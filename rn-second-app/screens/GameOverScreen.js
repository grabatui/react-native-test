import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
            </View>

            <BodyText style={styles.text}>Number of rounds: {props.guessRounds}</BodyText>
            <BodyText style={styles.text}>Number was: {props.userNumber}</BodyText>

            <Button title="RESTART THE GAME" onPress={props.onRestartPress} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        paddingBottom: 5,
    },
});

export default GameOverScreen;
