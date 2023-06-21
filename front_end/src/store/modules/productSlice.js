import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../service/axios/instance";

export const productMall = createAsyncThunk('product', async () => {
  const { data } = await get('mall');
  return data
})

export const productDetail = createAsyncThunk('product_detail', async (id) => {
  const { item } = await get(`product/${id}`);
  return item;
})

const initialState = {
  loading: false,
  listMall: [],
  itemDetail: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    //product mall
    builder.addCase(productMall.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(productMall.fulfilled, (state, action) => {
      state.listMall = action.payload;
      state.loading = false;
    });
    builder.addCase(productMall.rejected, (state) => {
      state.loading = false;
    });
  }
})

export default productSlice.reducer;