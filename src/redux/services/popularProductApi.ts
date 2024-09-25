// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Producto {
    id: number;
    imagenHamburguesa: string;
    nombreHamburguesa: string;
    precioHamburguesa: string;
}

export const popularProductApi = createApi({
    reducerPath: "popularProducts",
    baseQuery: fetchBaseQuery({ baseUrl: '/json/' }),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => 'popularProducts.json',
        }),
    }),
});

// Asegúrate de exportar el hook
export const { useGetAllProductosQuery } = popularProductApi;
