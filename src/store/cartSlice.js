import { createSlice } from "@reduxjs/toolkit";

// Load cart from sessionStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = sessionStorage.getItem("cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error loading cart from sessionStorage:", err);
    return [];
  }
};

// Save cart to sessionStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    sessionStorage.setItem("cart", serializedCart);
  } catch (err) {
    console.error("Error saving cart to sessionStorage:", err);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...product, count: 1 });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.count = count;
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.count, 0);
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.count, 0);

export default cartSlice.reducer;
