import React from 'react';
import Stack from './src/navigators/Stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/components/Login';
import LiveLocationMap from './src/components/userLiveLocation';

function App(): React.JSX.Element {
  return (
  <NavigationContainer>
    <Stack />
  </NavigationContainer>
    );
}

export default App;
