import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { decodeToken } from '../utils/token'

export const TokenStorageKey = 'SniSnap-Auth-X'
export interface AuthUser {
  sub: string
  username: string
}

interface IAuthState {
  user: AuthUser | null
  token: string | null
}

const AuthContext = createContext<
  IAuthState & {
    updateToken: (token: string | null) => void
    clear: () => void
  }
>({
  user: null,
  token: null,
  updateToken: () => {},
  clear: () => {},
})

const initialState: IAuthState = { user: null, token: null }

const StateActions = {
  SetToken: 'SetToken',
  SetUser: 'SetUser',
  Reset: 'Reset',
} as const

type StateAction = { type: keyof typeof StateActions } & Partial<IAuthState>

const actions: Record<keyof typeof StateActions, (s: IAuthState, a: StateAction) => IAuthState> = {
  [StateActions.SetToken]: (state: IAuthState, action: StateAction) => ({ ...state, token: action.token! }),
  [StateActions.SetUser]: (state: IAuthState, action: StateAction) => ({ ...state, user: action.user! }),
  [StateActions.Reset]: (_state: IAuthState, _action: StateAction) => ({ token: null, user: null }),
} as const

const stateReducer = (state: IAuthState, action: StateAction): IAuthState => {
  return actions[action.type](state, action)
}

const initState = () => {
  const token = localStorage.getItem(TokenStorageKey)
  const state: IAuthState = {
    token,
    user: null,
  }
  if (token) {
    state.user = decodeToken<AuthUser>(token)
  }
  return state
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<(state: IAuthState, action: StateAction) => IAuthState, IAuthState>(
    stateReducer,
    initialState,
    initState
  )

  const updateToken = useCallback((token: string | null) => {
    dispatch({ type: StateActions.SetToken, token })
    if (token) {
      const decoded = decodeToken<AuthUser>(token)
      dispatch({ type: StateActions.SetUser, user: decoded })
    }
    localStorage.setItem(TokenStorageKey, token as string)
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(TokenStorageKey)
    dispatch({ type: StateActions.Reset })
  }, [])

  useEffect(() => {
    window.addEventListener('auth:clear', clear)

    return () => {
      window.removeEventListener('auth:clear', clear)
    }
  })

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, clear, updateToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
