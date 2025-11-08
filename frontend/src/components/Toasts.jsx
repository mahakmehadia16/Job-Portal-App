
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ToastsContext = createContext(null)
export const useToasts = () => useContext(ToastsContext)

export default function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const addToast = useCallback((text, type='success') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, text, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])
  return (
    <ToastsContext.Provider value={{ addToast }}>
      {children}
      <div className="toasts">
        {toasts.map(t => <div key={t.id} className={`toast ${t.type}`}>{t.text}</div>)}
      </div>
    </ToastsContext.Provider>
  )
}
