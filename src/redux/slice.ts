/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// ** type
import { TUserResponse } from '@/types/auth'

// ** action
import { loginThunk, logoutThunk } from './action'

interface TUserState {
  user: {
    _id: string
    name: string
    email: string
    picture: string
    role: string[]
    stripe_account_id: string
  } | null
  isAuthenticated: boolean
}

const initialState: TUserState = {
  user: null,
  isAuthenticated: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
      state.user = action.payload.result.user
      state.isAuthenticated = true
    })
    builder.addCase(loginThunk.rejected, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
  },
  reducers: {}
})

export default authSlice.reducer
