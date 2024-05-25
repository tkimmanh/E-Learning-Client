import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = 'http://localhost:8017/'

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
      if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data?.msg || error.message
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
        return Promise.reject(error)
      }
    }
  )

  return instance
}

const http = createHttpInstance()

export default http
