import React from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/Input';
import colors from '../../constants/colors';


const AuthScreen = () => {
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
                            onInputChanged={() => {}}
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
                            onInputChanged={() => {}}
                            initialValue=""
                            initialIsValid={true}
                        />

                        <View style={styles.button}>
                            <Button
                                title="Login"
                                color={colors.primary}
                                onPress={() => {}}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="Switch to Sign up"
                                color={colors.accent}
                                onPress={() => {}}
                            />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
