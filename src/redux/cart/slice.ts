import { createSlice } from '@reduxjs/toolkit'
import { addToCartThunk, createPaymentThunk, executePaymentThunk } from './actions'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], payment: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.cart = action.payload.result
    })
    builder.addCase(createPaymentThunk.fulfilled, (state, action) => {
      state.payment = action.payload
    })
    builder.addCase(executePaymentThunk.fulfilled, (state) => {
      state.cart = []
      state.payment = null
    })
  }
})

export default cartSlice.reducer
