import { SetContextLink } from '@apollo/client/link/context'
import { AuthState } from '../../state/auth.state'

export const authLink = new SetContextLink(prevContext => {
  const token = AuthState.access_token.get()
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
