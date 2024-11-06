// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Producto {
    id: number;
    imagenPapas: string;
    nombrePapas: string;
    precioPapas: number;
    descripcion: string
}

export const papasApi = createApi({
    reducerPath: "papas",
    baseQuery: fetchBaseQuery({ baseUrl: '/json/' }),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => 'papas.json',
        }),
    }),
});

// Asegúrate de exportar el hook
export const { useGetAllProductosQuery } = papasApi;
