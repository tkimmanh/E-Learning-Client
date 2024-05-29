// ** lib
import http from '@/lib/axios'

// ** redux
import { createAsyncThunk } from '@reduxjs/toolkit'

// ** type
import { TAuth, TUserResponse } from '@/types/auth'

export const loginThunk = createAsyncThunk('auth/login', async (payload: Omit<TAuth, 'name'>) => {
  const response = await http.post<TUserResponse>('auth/login', payload)
  return response.data
})

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const response = await http.get('auth/logout')
  return response.data
})
