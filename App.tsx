import React from 'react';
import {CreativeDashboard} from './src/Screens';
import {AppContextProvider} from './src/Contexts';

const App = () => {
  return (
    <AppContextProvider>
      <CreativeDashboard />
    </AppContextProvider>
  );
};

export default App;
