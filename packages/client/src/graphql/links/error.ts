import { CombinedGraphQLErrors } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { enqueueSnackbar } from 'notistack'
import { DEFAULT_SNACKBAR_CONFIG } from '../../utils/snackbar'

const rateLimitHandler = (): void => {
  enqueueSnackbar('You exceeded the request limit! try again later', {
    ...DEFAULT_SNACKBAR_CONFIG,
    variant: 'error',
  })
}

export const constErrorHandlers: Record<string, () => void> = {
  ['Unauthorized']: () => {
    console.log('auth failed')
    window.dispatchEvent(new CustomEvent('auth:clear'))
  },
  ['ThrottlerException: Too Many Requests']: rateLimitHandler,
}

export const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      const handlerKey = Object.keys(constErrorHandlers).find(key => message.includes(key))

      if (handlerKey) {
        constErrorHandlers[handlerKey]()
      } else {
        console.log('Unhandled GraphQL Error:', message)
      }
    })
  }
})
