import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ShopNavigation from './navigation/ShopNavigation';

import productsReducer from './store/reducers/products';


const store = createStore(
    combineReducers({
        products: productsReducer,
    })
);

export default function App() {
    return (
        <Provider store={store}>
            <ShopNavigation />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
