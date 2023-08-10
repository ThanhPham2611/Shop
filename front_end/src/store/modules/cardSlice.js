import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cardObj: {}
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardObj: (state, action) => {
      state.cardObj = action.payload;
    }
  },
});

export const { setCardObj } = cardSlice.actions;
export default cardSlice.reducer;
