import { toast, Bounce, ToastOptions } from 'react-toastify';

export interface ToastifyParams {
  type: 'success' | 'failure',
  message: string
}

export const useToastify = () => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  }

  return (
    type: ToastifyParams['type'],
    message: ToastifyParams['message'],
    options: ToastOptions = defaultOptions
  ) => {
    const toastOptions: ToastOptions = {...defaultOptions, ...options}

    switch (type) {
      case 'success': 
        toast.success(message, toastOptions)
        break

      case 'failure': 
        toast.error(message, toastOptions)
        break
    }
  }
}
