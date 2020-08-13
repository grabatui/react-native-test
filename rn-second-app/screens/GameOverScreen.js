import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>The Game is Over!</TitleText>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.textContainer}>
                <BodyText style={styles.text}>
                    Your phone needed <Text style={styles.highlight}>{props.guessRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>

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
    title: {
        fontSize: 22,
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
        paddingTop: 5,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 18,
    },
    textContainer: {
        width: '80%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});

export default GameOverScreen;
