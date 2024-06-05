// ** lib
import http from '@/lib/axios'

// ** Types
import { TAuth } from '@/types/auth'

const BASE_URL = '/auth'

export const registerApi = async (body: TAuth) => {
  return http.post(`${BASE_URL}/register`, body)
}
export const forgotPasswordApi = async (body: { email: string }) => {
  return http.post(`${BASE_URL}/forgot-password`, body)
}
export const resetPasswordApi = async (body: { new_password: string; short_code: string }) => {
  return http.post(`${BASE_URL}/reset-password`, body)
}
