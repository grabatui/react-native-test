import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';


const OpenDrawerIcon = ({ navigation }) => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Open drawer"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    );
};

export default OpenDrawerIcon;
