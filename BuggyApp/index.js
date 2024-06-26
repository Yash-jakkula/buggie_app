/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/state';

export default function Main():React.JSX.Element{
    return (
    <Provider store={store}>
    <PaperProvider>
    <App />
    </PaperProvider>
    </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Main);
