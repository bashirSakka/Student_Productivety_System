import { createContext, useContext, useEffect, useState } from 'react'
const ViewportContext = createContext()
export default function ViewportProvider ({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 865)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 865)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <ViewportContext.Provider value={{ isMobile }}>
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = () => useContext(ViewportContext)
