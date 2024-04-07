import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/App/store';
import {CreativeDashboard, HomeScreen} from './src/Screens';
import {AppContextProvider} from './src/Contexts';

const App = () => {
  return (
    <AppContextProvider>
      <CreativeDashboard />
    </AppContextProvider>
    // <Provider store={store}>
    //   <HomeScreen />
    // </Provider>
  );
};

export default App;
