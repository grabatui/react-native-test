import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import colors from '../constants/colors'


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of rounds: {props.guessRounds}</Text>
            <Text>Number was: {props.userNumber}</Text>

            <Button title="RESTART THE GAME" onPress={props.onRestartPress} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default GameOverScreen;
