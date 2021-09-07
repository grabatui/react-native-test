import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import colors from '../../constants/colors';
import { signUp, signIn } from '../../store/actions/auth';


const AuthScreen = () => {
    const data = {
        email: '',
        password: '',
    };

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setSignup] = useState(false);

    const [saveData, setSaveData] = useState(data);
    const [validData, setValidData] = useState({
        email: false,
        password: false,
    });

    const setSaveDataValue = useCallback(
        (label, value, isValid) => {
            setSaveData((state) => ({
                ...state,
                [label]: value,
            }));
    
            setValidData((state) => ({
                ...state,
                [label]: isValid,
            }));
        },
        [setSaveData, setValidData]
    );

    const dispatch = useDispatch();

    const onButtonPressed = useCallback(
        async () => {
            for (let validDataField of Object.keys(validData)) {
                if ( ! validData[validDataField]) {
                    Alert.alert(
                        'Wrong input!',
                        'Please check the errors in the form',
                        [
                            {text: 'Okay'},
                        ]
                    );

                    return;
                }
            }

            setIsLoading(true);
            setError(null);

            try {
                const action = isSignup
                    ? signUp(saveData.email, saveData.password)
                    : signIn(saveData.email, saveData.password);

                dispatch(action);
            } catch (dispatchError) {
                setError(dispatchError.message);
            }

            setIsLoading(false);
        },
        [saveData, validData]
    );

    useEffect(
        () => {
            if (error) {
                Alert.alert(
                    'An error occured!',
                    error,
                    [
                        {text: 'Okay'}
                    ]
                );
            }
        },
        [error]
    );

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.wrapper}
        >
            <LinearGradient
                colors={['#ffe3ff', '#ffbdff']}
                style={styles.gradient}
            >
                <View style={styles.innerWrapper}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            vaidateRequired
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChanged={setSaveDataValue}
                            initialValue=""
                            initialIsValid={true}
                        />
                        
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            vaidateRequired
                            validateMin={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid passord"
                            onInputChanged={setSaveDataValue}
                            initialValue=""
                            initialIsValid={true}
                        />

                        <View style={styles.button}>
                            <Button
                                title={isSignup ? 'Sign up' : 'Sign in'}
                                color={colors.primary}
                                onPress={onButtonPressed}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title={'Switch to ' + (isSignup ? 'Sign in' : 'Sign up')}
                                color={colors.accent}
                                onPress={() => {
                                    setSignup((state) => ! state);
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerWrapper: {
        width: '80%',
        maxWidth: 400,
        height: '50%',
        maxHeight: 400,
    },
    button: {
        marginTop: 10,
    },
});

export default AuthScreen;
