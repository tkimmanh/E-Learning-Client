import { createAsyncThunk } from '@reduxjs/toolkit'

import http from '@/lib/axios'

export const addToCartThunk = createAsyncThunk('cart/addToCart', async (courseId: string) => {
  const response = await http.post('/cart/add-to-cart', { courseId })
  return response.data
})

export const createPaymentThunk = createAsyncThunk('cart/createPayment', async () => {
  const response = await http.post('/cart/create-payment')
  return response.data
})

export const executePaymentThunk = createAsyncThunk(
  'cart/executePayment',
  async (paymentData: { paymentId: string; payerId: string }) => {
    const response = await http.post('/cart/execute-payment', paymentData)
    return response.data
  }
)
