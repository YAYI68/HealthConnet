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
  const [navHeight, setNavHeight] = useState('')
  const headerRef = useRef()
  const { ref, inView } = useInView({
    root: null,
    threshold: 0,
  })


  const value = {
    ref,
    inView,
    headerRef,
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
