import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from '../../service/axios/instance'


export const myProfile = createAsyncThunk('profile', async () => {
  const { user: data } = await get('profile');
  return data;
})

const initialState = {
  loading: false,
  userData: {}
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: (builder) => {
    //userInfo
    builder.addCase(myProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(myProfile.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    });
    builder.addCase(myProfile.rejected, (state) => {
      state.loading = false;
    });
  }
})

export default userInfoSlice.reducer;