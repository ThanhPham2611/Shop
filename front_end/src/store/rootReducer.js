import { combineReducers } from '@reduxjs/toolkit'

import cartSlice from './modules/cartSlice';
import verifySlice from './modules/verifySlice';
import userInfoSlice from './modules/userInfoSlice';

export default combineReducers({
  cartInfo: cartSlice,
  verifyInfo: verifySlice,
  userInfo: userInfoSlice
})