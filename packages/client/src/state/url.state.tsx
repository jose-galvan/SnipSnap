import { createContext, useCallback, useContext, useState } from 'react'
import type { UrlType } from '@generated/server.sdk'

const UrlContext = createContext({
  lastGenerated: null as Partial<UrlType> | null,
  setLastGenerated: (() => {}) as (value: Partial<UrlType> | null) => void,
  clear: (() => {}) as () => void,
})

export const UrlGeneratedProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastGenerated, setLastGenerated] = useState<Partial<UrlType> | null>(null)

  const clear = useCallback(() => setLastGenerated(null), [])

  return <UrlContext.Provider value={{ lastGenerated, setLastGenerated, clear }}>{children}</UrlContext.Provider>
}

export const useUrlState = () => useContext(UrlContext)
