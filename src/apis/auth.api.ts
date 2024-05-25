// ** lib
import http from '@/lib/axios'

// ** Types
import { TAuth } from '@/types/auth'

const BASE_URL = '/auth'

export const registerApi = async (body: TAuth) => {
  return http.post(`${BASE_URL}/register`, body)
}
export const loginApi = async (body: Omit<TAuth, 'name'>) => {
  return http.post(`${BASE_URL}/login`, body)
}
