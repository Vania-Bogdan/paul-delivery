import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://631de489789612cd07b2575a.mockapi.io',
    }),
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => `/contacts`,
        }),
    }),
});

export const { useGetContactsQuery } = contactsApi;