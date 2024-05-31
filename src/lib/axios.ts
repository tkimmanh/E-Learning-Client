/* eslint-disable @typescript-eslint/no-explicit-any */
// ** redux

// ** axios
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

// ** react-toastify
import { toast } from 'react-toastify'

// ** config
import { toastConfig } from '@/config/toast.config'

const BASE_URL = 'http://localhost:8017/'
declare module 'axios' {
  export interface AxiosRequestConfig {
    __isRetryRequest?: boolean
  }
}

function createHttpInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL
  })
  instance.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error: AxiosError) {
      if (error.response) {
        const status = error.response.status
        if (status === HttpStatusCode.Unauthorized && !error.response.config?.__isRetryRequest) {
          return new Promise<void>((_resolve, reject) => {
            axios
              .get('/auth/logout')
              .then(() => {
                window.localStorage.clear()
                window.location.href = '/login'
              })
              .catch((error) => {
                console.error('Logout interceptors failed', error)
                reject(error)
              })
          })
        }
        if (status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response.data
          const message = data?.msg || error.message
          toast.error(message, {
            ...toastConfig
          })
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
  )
  return instance
}

const http = createHttpInstance()

export default http
