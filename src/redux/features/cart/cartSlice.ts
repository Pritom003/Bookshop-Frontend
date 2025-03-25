import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  inStock: number; // Ensure this value is used to check stock limits
  image: string; // Optional: for displaying in the UI
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const { product, quantity, inStock } = action.payload;
      const existingItem = state.items.find((item) => item.product === product);

      if (existingItem) {
        if (existingItem.quantity + quantity <= inStock) {
          existingItem.quantity += quantity;
          state.totalQuantity += quantity;
          state.totalPrice += existingItem.price * quantity;
        }
      } else {
        if (quantity <= inStock) {
          state.items.push(action.payload);
          state.totalQuantity += quantity;
          state.totalPrice += action.payload.price * quantity;
        }
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },

updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
  const { id, quantity } = action.payload;
  const existingItem = state.items.find((item) => item.product === id);

  if (existingItem) {
    if (quantity > 0 && quantity <= existingItem.inStock) {
      const quantityDifference = quantity - existingItem.quantity;
      existingItem.quantity = quantity;
      state.totalQuantity += quantityDifference;
      state.totalPrice += quantityDifference * existingItem.price;
    }
  }
},


    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
