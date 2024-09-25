import { configureStore } from "@reduxjs/toolkit";
import { popularProductApi } from "@/redux/services/popularProductApi";

export const store = configureStore({
    reducer: {
        [popularProductApi.reducerPath]: popularProductApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(popularProductApi.middleware),
});
