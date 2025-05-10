import React from 'react';
import {HomeScreen} from './src/Screens';
import {AppContextProvider} from './src/Contexts';
import {Text} from 'react-native';

const App = () => {
  return (
    <AppContextProvider>
      <HomeScreen />
    </AppContextProvider>
  );
};

export default App;
