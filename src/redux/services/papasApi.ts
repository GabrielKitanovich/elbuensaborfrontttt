// src/redux/services/popularProductApi.ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface Producto {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

export const papasApi = createApi({
    reducerPath: "papas",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/v1/products/fries'}),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => '',
        }),
    }),
});

// Asegúrate de exportar el hook
export const {useGetAllProductosQuery} = papasApi;
