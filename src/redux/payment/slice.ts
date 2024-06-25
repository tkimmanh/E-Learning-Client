/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// ** action
import { createPaymentApi, executePaymentApi } from './action'

type InitialState = {
  payment: IPayment | null
  executePayment: any
  loading: boolean
}

const initialState: InitialState = {
  payment: null,
  executePayment: null,
  loading: false
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  extraReducers(builder) {
    // ** create payment
    builder.addCase(createPaymentApi.fulfilled, (state, action: PayloadAction<any>) => {
      state.payment = action.payload
      state.loading = false
    })
    builder.addCase(createPaymentApi.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPaymentApi.rejected, (state) => {
      state.loading = false
      state.payment = null
    })
    // ** execute payment
    builder.addCase(executePaymentApi.fulfilled, (state, action: PayloadAction<any>) => {
      state.executePayment = action.payload.result
      state.loading = false
    })
  },
  reducers: {}
})

export default paymentSlice.reducer
