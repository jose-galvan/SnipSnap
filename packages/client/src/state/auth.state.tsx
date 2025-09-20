import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { decodeToken } from '../utils/token'

export const TokenStorageKey = 'SniSnap-Auth-X'
export interface AuthUser {
  sub: string
  username: string
}

interface IAuthState {
  user: AuthUser | null
  token: string | null
  updateToken: (token: string | null) => void
  clear: () => void
}

const AuthContext = createContext<IAuthState>({
  user: null,
  token: null,
  updateToken: () => {},
  clear: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(TokenStorageKey)
    if (token) {
      updateToken(token)
    }
  }, [])

  const updateToken = useCallback((token: string | null) => {
    setToken(token)
    if (token) {
      const decoded = decodeToken<AuthUser>(token)
      setUser(decoded)
    }
    localStorage.setItem(TokenStorageKey, token as string)
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(TokenStorageKey)
    setUser(null)
    setToken(null)
  }, [])

  useEffect(() => {
    window.addEventListener('auth:clear', clear)

    return () => {
      window.removeEventListener('auth:clear', clear)
    }
  })

  return <AuthContext.Provider value={{ user, token, clear, updateToken }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
