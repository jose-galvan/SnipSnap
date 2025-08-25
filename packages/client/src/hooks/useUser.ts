import { useHookstate } from '@hookstate/core'
import { AuthState, clearAuthState } from '../state/auth.state'
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
  const user = useHookstate(AuthState).user
  const isAuthenticated = !!user.value?.sub
  const navigate = useNavigate()

  const logOut = useCallback(() => {
    clearAuthState()
    navigate('/')
  }, [])

  return { user, isAuthenticated, logOut } as const
}
