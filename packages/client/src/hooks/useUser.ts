import { none, useHookstate } from '@hookstate/core'
import { AuthState } from '../state/auth.state'
import { useCallback } from 'react'

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

  const logOut = useCallback(() => {
    AuthState.user.set(none)
    AuthState.access_token.set(null)
  }, [])

  return { user, isAuthenticated, logOut } as const
}
