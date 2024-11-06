// redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Importa RootState según tu configuración
export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number; // Agregar cantidad aquí
}

interface CartState {
  items: Product[];
}

// Función para cargar el carrito desde localStorage
const loadCartFromLocalStorage = (): Product[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(), // Cargar desde localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex >= 0) {
        if (state.items[existingProductIndex].quantity < 5) {
          state.items[existingProductIndex].quantity += 1;
        }
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.items.push(newProduct);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload);
      if (existingProductIndex >= 0 && state.items[existingProductIndex].quantity > 1) {
        state.items[existingProductIndex].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload);
      if (existingProductIndex >= 0) {
        state.items.splice(existingProductIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// Selector para verificar si el carrito está vacío
export const isCartEmpty = (state: RootState): boolean => state.cart.items.length === 0;

//cantidad en el carrito
export const selectTotalItems = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Exporta las acciones
export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Exporta el reducer por defecto
export default cartSlice.reducer;

