import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

import DefaultText from './DefaultText';

const MealItem = ({ title, onPress, duration, complexity, affordability, image }) => {
    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <View style={styles.wrapper}>
            <TouchableComponent style={{flex: 1}} onPress={onPress}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: image}} style={styles.backgroundImage}>
                            <View style={styles.mealTitleWrapper}>
                                <Text style={styles.mealTitle}>{title}</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{duration}</DefaultText>
                        <DefaultText>{complexity}</DefaultText>
                        <DefaultText>{affordability}</DefaultText>
                    </View>
                </View>
            </TouchableComponent>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        width: '100%',
        backgroundColor: '#e5e5e5',
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden'
    },
    mealTitleWrapper: {
        backgroundColor: 'rgba(0,0,0,.6)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    mealTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: '85%',
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
});

export default MealItem;
