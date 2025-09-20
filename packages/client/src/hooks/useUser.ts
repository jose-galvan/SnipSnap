import { useAuth } from '../state/auth.state'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

/**
 * Custom hook for managing user authentication state
 *
 * @returns {Array} Tuple containing:
 *   - user: Hookstate proxy for the current user object
 *   - isAuthenticated: Boolean indicating if user is logged in
 *   - logOut: Function to clear user session
 */

export const useUser = () => {
  const { user, clear } = useAuth()
  const isAuthenticated = !!user?.sub
  const navigate = useNavigate()

  const logOut = useCallback(() => {
    clear()
    navigate('/')
  }, [])

  return { user, isAuthenticated, logOut } as const
}
