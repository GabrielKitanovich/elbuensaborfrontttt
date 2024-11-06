// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Producto {
        id:number
        imagenHamburguesa:string,
        nombreHamburguesa:string,
        precioHamburguesa:number,
        descripcion:string,
}

export const hamburguesasApi = createApi({
    reducerPath: "hamburguesas",
    baseQuery: fetchBaseQuery({ baseUrl: '/json/' }),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => 'hamburguesas.json',
        }),
    }),
});

// Asegúrate de exportar el hook
export const { useGetAllProductosQuery } = hamburguesasApi;
