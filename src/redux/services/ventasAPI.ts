// src/redux/services/popularProductApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Venta {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

export const ventasApi = createApi({
    reducerPath: "venta",
    baseQuery: fetchBaseQuery({ baseUrl: '' }),  
    endpoints: (builder) => ({
        
        postProductos: builder.mutation<void, Venta[]>({
            query: (productos) => ({
                url: 'http://localhost:8080/api/v1/sells',  
                method: 'POST',            
                body: productos,           
            }),
        }),
    }),
});


export const { usePostProductosMutation } = ventasApi;
