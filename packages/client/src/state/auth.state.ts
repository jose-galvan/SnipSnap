import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

export interface AuthUser {
  sub: string
  username: string
}

interface IAuthState {
  user: AuthUser | null
  access_token: string | null
}

export const AuthState = hookstate<IAuthState>(
  {
    user: null,
    access_token: null,
  },
  localstored({
    key: 'SniSnap-Auth-X',
  })
)

export const clearAuthState = () => {
  AuthState.merge({
    user: null,
    access_token: null,
  })
}
