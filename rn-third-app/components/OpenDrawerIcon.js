import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';


const OpenDrawerIcon = ({ navigation }) => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Open drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    );
};

export default OpenDrawerIcon;
