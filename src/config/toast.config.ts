import { Bounce, ToastOptions } from 'react-toastify'

export const toastConfig: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce
}
