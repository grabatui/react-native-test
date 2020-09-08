import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';


const GameOverScreen = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
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

                <MainButton onPress={props.onRestartPress}>RESTART THE GAME</MainButton>
            </View>
        </ScrollView>
    )
};

const imageSize = Dimensions.get('window').width * 0.7;
const imageMargin = Dimensions.get('window').height / 25;
const textFontSize = (Dimensions.get('window').height < 400) ? 16 : 18;

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
    },
    imageContainer: {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
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
        fontSize: textFontSize,
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
