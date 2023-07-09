import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  select: {},
  product: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isOpen = action.payload;
    },
    getSelect: (state, action) => {
      state.select = action.payload;
    },
    addCart: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { toggleCart, getSelect, addCart } = cartSlice.actions;
export default cartSlice.reducer;
