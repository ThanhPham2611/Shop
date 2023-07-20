import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  infoChat: {}
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getId: (state, action) => {
      state.infoChat = action.payload;
    }
  },
});

export const { getId } = messageSlice.actions;
export default messageSlice.reducer;
