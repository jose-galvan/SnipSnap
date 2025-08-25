import { CombinedGraphQLErrors } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { enqueueSnackbar } from 'notistack'
import { clearAuthState } from '../../state/auth.state'
export const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      if (message.includes('Too Many Requests')) {
        enqueueSnackbar('You exceeded the request limit! try again later', {
          autoHideDuration: 1200,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom',
          },
          variant: 'error',
        })
      }
      if (message.includes('Unauthorized')) {
        clearAuthState()
      }
    })
  }
})
