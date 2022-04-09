import { createSlice, current } from "@reduxjs/toolkit";

function getItem() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cartItems"));
  }
}
const cartItems = getItem();

const initialState = {
  items: cartItems ? cartItems : [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index].qty += 1;
      } else {
        state.items = [...state.items, { ...action.payload, qty: 1 }];
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeFromBasket: (state, action) => {
      const newBasket = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = newBasket;
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    decreasedFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.items[itemIndex].qty > 1) {
        state.items[itemIndex].qty -= 1;
      } else if (state.items[itemIndex].qty === 1) {
        const newBasket = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = newBasket;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    clearCart(state, action) {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToBasket, removeFromBasket, decreasedFromCart, clearCart } =
  basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price * item.qty, 0);

export default basketSlice.reducer;
