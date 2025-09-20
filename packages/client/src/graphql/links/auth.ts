import { SetContextLink } from '@apollo/client/link/context'
import { TokenStorageKey } from '../../state/auth.state'

export const authLink = new SetContextLink(prevContext => {
  const token = localStorage.getItem(TokenStorageKey)
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
