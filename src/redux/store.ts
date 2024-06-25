// ** persis
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ** slice
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/slice'
import { courseSlice } from './course/slice'
import { cartSlice } from './cart/slice'
import { paymentSlice } from './payment/slice'

// type
import { TUserState } from './auth/slice'

// ** config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'isAuthenticated'] // Chỉ định slice nào cần được lưu trữ
}

const persistedAuthReducer = persistReducer<TUserState>(persistConfig, authSlice.reducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    course: courseSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
