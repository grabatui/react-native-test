import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/place';


const store = createStore(
    combineReducers({
        places: placesReducer,
    }),
    applyMiddleware(thunk)
);

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
