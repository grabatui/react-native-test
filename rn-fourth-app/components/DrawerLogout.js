import React from "react";
import { StyleSheet, SafeAreaView, SafeAreaView, Button, View } from "react-native";
import { DrawerItemList } from '@react-navigation/drawer';
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";


const DrawerLogout = (props) => {
    const dispatch = useDispatch();

    const onLogoutPress = () => {
        dispatch(
            logout()
        );
    };

    return (
        <View style={styles.wrapper}>
            <SafeAreaView>
                <DrawerItemList {...props} />

                <Button
                    title="Logout"
                    color={colors.primary}
                    onPress={onLogoutPress}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
    }
});

export default DrawerLogout;
