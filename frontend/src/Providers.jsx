
import React from 'react'
import ToastsProvider from './components/Toasts'
import { AuthProvider } from './context/AuthContext'
export default function Providers({ children }) {
  return (<ToastsProvider><AuthProvider>{children}</AuthProvider></ToastsProvider>)
}
