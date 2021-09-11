import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import thunk from 'redux-thunk';

import ShopNavigation from './navigation/ShopNavigation';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        auth: authReducer,
    }),
    applyMiddleware(thunk)
);

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if ( ! fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={(error) => console.error(error)}
            />
        );
    }

    return (
        <Provider store={store}>
            <ShopNavigation />
        </Provider>
    );
}
