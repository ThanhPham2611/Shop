import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  select: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isOpen = action.payload;
    },
    getSelect: (state, action) => {
      state.select = action.payload;
    }
  }
})

export const { toggleCart, getSelect } = cartSlice.actions;
export default cartSlice.reducer;