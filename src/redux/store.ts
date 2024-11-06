// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { popularProductApi } from "@/redux/services/popularProductApi";
import { hamburguesasApi } from "@/redux/services/hamburguesasApi";
import { bebidasApi } from "./services/bebidasApi";
import { papasApi } from "./services/papasApi";
import cartReducer from "./cartSlice"; // Asegúrate de importar el reducer por defecto

export const store = configureStore({
  reducer: {
    
    [popularProductApi.reducerPath]: popularProductApi.reducer,
    [hamburguesasApi.reducerPath]: hamburguesasApi.reducer,
    [bebidasApi.reducerPath]: bebidasApi.reducer,
    [papasApi.reducerPath]: papasApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(popularProductApi.middleware)
      .concat(hamburguesasApi.middleware)
      .concat(bebidasApi.middleware)
      .concat(papasApi.middleware),
});

// Exporta el tipo del estado de la tienda
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
