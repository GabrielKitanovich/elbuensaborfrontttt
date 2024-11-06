// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Producto {
    id: number;
    imagenBebida: string;
    nombreBebida: string;
    precioBebida: number;
    descripcion: string
}

export const bebidasApi = createApi({
    reducerPath: "bebidas",
    baseQuery: fetchBaseQuery({ baseUrl: '/json/' }),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => 'bebidas.json',
        }),
    }),
});

// Asegúrate de exportar el hook
export const { useGetAllProductosQuery } = bebidasApi;
