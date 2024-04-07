import React, {createContext, ReactNode, useContext, useState} from 'react';

const AppContext = createContext<any>({});

type AppContextProviderProps = {
  children?: ReactNode;
};

export default ({children}: AppContextProviderProps) => {
  const [allBoxData, setAllBoxData] = useState<any>([]);
  return (
    <AppContext.Provider
      value={{
        allBoxData,
        setAllBoxData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
