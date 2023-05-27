import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react'
import { useInView } from 'react-intersection-observer'


export const AppContext = createContext()

export function AppProvider({ children }) {
  const [ upDateModal, setUpdateModal ] = useState(false)
  const [ modalMessage , setModalMessage ] = useState('')



  const value = {
    upDateModal, setUpdateModal,
    modalMessage , setModalMessage
  }
  return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context == undefined) {
    throw new Error('useAppContext must be within a App provider')
  }
  return context
}
