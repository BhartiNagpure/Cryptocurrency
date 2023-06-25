import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
  'X-RapidAPI-Key': 'bf5de58da1msh8045d18b567c7bcp1b717ajsnb2f8c4a5f21e',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/coins'

const createRequest = (url) => ({ url, headers: cryptoApiHeader })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins')
    })
  })
});

export const {
  useGetCryptosQuery,
} = cryptoApi;

