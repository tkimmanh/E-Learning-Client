// ** persis
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ** redux
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/slice'
import { courseSlice } from './course/slice'

// ** slice

// ** config
const persistConfig = {
  key: 'root/auth', // key lưu trữ
  storage,
  whitelist: ['user', 'isAuthenticated'] //['auth', 'user'] => chỉ lưu trữ redux auth
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    course: courseSlice.reducer
  }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
