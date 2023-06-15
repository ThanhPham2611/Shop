import { combineReducers } from '@reduxjs/toolkit'

import cartSlice from './modules/cartSlice';

export default combineReducers({
  cartInfo: cartSlice,
})