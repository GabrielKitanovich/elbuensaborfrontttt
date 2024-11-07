// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Producto {
    id: string
    image: string,
    name: string,
    price: number,
    category: string,
    description: string,
}

export const bebidasApi = createApi({
    reducerPath: "bebidas",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/products/drinks' }),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => '',
        }),
    }),
});

// Asegúrate de exportar el hook
export const { useGetAllProductosQuery } = bebidasApi;
