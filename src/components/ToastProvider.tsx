import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const contextClass = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-gray-200",
  warning: "bg-orange-500",
  default: "bg-gray-500",
  dark: "bg-white-600 font-gray-300",
};

export function ToastProvider() {
  return (
    <>
      <ToastContainer
        className='mt-5'
        toastClassName={(entry) => {
          const type = entry?.type
          return `
            ${contextClass[type || 'default']} 
            relative p-1 min-h-10 rounded-md 
            flex justify-between 
            overflow-hidden cursor-pointer
          `
        }}
        position="top-right"
        autoClose={2500}
        newestOnTop={false}
        hideProgressBar
        theme="colored"
      />
    </>
  )
}
