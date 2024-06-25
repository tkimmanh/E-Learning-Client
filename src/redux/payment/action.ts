import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/axios'

const BASE_URL = 'payment'

export const createPaymentApi = createAsyncThunk('payment/createPayment', async (courseId: string, thunkAPI) => {
  try {
    const response = await http.post(`${BASE_URL}/create-payment/${courseId}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const executePaymentApi = createAsyncThunk(
  'payment/executePayment',
  async ({ paymentId, payerId }: { paymentId: string; payerId: string }, thunkAPI) => {
    try {
      const response = await http.post(`${BASE_URL}/execute-payment`, { paymentId, payerId })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
