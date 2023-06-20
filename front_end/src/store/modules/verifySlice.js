import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: ''
}

const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    getUsername: (state, action) => {
      state.username = action.payload;
    }
  }
})

export const { getUsername } = verifySlice.actions;
export default verifySlice.reducer;