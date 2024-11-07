// src/redux/services/popularProductApi.ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface Producto {
    id: string
    image: string,
    name: string,
    price: number,
    description: string,
}

export const hamburguesasApi = createApi({
    reducerPath: "hamburguesas",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/v1/products/burgers'}),
    endpoints: (builder) => ({
        getAllProductos: builder.query<Producto[], void>({
            query: () => '', // La ruta será '/api/v1/products' para obtener todos los productos
        }),
    }),
});


// Asegúrate de exportar el hook
export const {useGetAllProductosQuery} = hamburguesasApi;
