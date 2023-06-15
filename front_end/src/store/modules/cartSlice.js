import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isOpen = action.payload;
    }
  }
})

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;