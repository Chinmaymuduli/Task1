import {configureStore} from '@reduxjs/toolkit';
import {PokemonApi} from '../Services/PokemonApi';

export const store = configureStore({
  reducer: {
    [PokemonApi.reducerPath]: PokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([PokemonApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
