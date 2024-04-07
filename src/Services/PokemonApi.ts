import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const PokemonApi = createApi({
  reducerPath: 'PokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getAllPokemon: builder.query<any, {limit: number; offset?: number}>({
      query: ({limit, offset}) => ({
        url: `pokemon?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const {useGetAllPokemonQuery} = PokemonApi;
