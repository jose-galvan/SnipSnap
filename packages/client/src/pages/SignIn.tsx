import { NavLink, useLocation, useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSignInMutation, useSignUpMutation, useSetUrlOwnerMutation } from '@generated/server.sdk'
import { AuthState, type AuthUser } from '../state/auth.state'
import { decodeToken } from '../utils/token'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { none, useHookstate } from '@hookstate/core'
import { clearUrlState, UrlState } from '../state/url.state'
import { isGraphQLError } from '../utils/error'

const FormSchema = yup
  .object({
    username: yup.string().min(6).required('Please enter your username'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required(),
  })
  .required('Please enter your password')

const fields = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'password', type: 'password', label: 'Password' },
]

const SignIn = () => {
  const location = useLocation()
  const [signIn] = useSignInMutation()
  const [signUp] = useSignUpMutation()
  const [setOwner] = useSetUrlOwnerMutation()
  const isSignUp = location.pathname.includes('signup')
  const navigate = useNavigate()
  const shortUrl = useHookstate(UrlState).lastUrlGenerated
  const { isAuthenticated } = useUser()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const setUser = (token: string) => {
    const decoded = decodeToken<AuthUser>(token)
    AuthState.merge({
      access_token: token,
      user: decoded,
    })
  }

  const handleMutation = async (input: any, mutation: (args: any) => Promise<any>) => {
    const responseKey = isSignUp ? 'signUp' : 'signIn'
    try {
      const response = await mutation({
        variables: {
          input,
        },
      })
      if (response.data?.[`${responseKey}`]) {
        setUser(response.data?.[`${responseKey}`].access_token)

        // this updates the url's owner of the last url crearted after user signin/signup
        if (shortUrl.value?.id && !shortUrl.value.createdById) {
          await setOwner({
            variables: {
              id: shortUrl.value.id,
            },
          })
        }
        clearUrlState()
        navigate('/')
      }
    } catch (err: unknown) {
      if (isGraphQLError(err)) {
        const hasUnauthorizedError = err.errors.some(e => e.message.includes('Unauthorized'))
        if (hasUnauthorizedError) {
          setError('root', { message: 'Invalid username or password' })
          return
        }
      }
      enqueueSnackbar('Something went wrong! Verify your credentials or Try again later', {
        autoHideDuration: 1200,
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'bottom',
        },
        variant: 'error',
      })
    }
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!isValid) return

    if (isSignUp) {
      return handleMutation(data, signUp)
    } else {
      return handleMutation(data, signIn)
    }
  }

  const action = isSignUp ? 'Sign Up' : 'Sign In'

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='card w-full max-w-md shadow-xl bg-base-100'>
        <div className='card-body'>
          <h2 className='text-2xl font-bold text-center'>{action}</h2>
          <p className='text-sm text-center text-base-content/70 mb-4'>
            {action} to save and manage your shortened links
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {fields.map(({ name, label, type }) => (
              <div key={name} className='form-control relative h-[5rem]'>
                <label htmlFor={name} className='label'>
                  <span className='label-text'>{label}</span>
                </label>
                <input
                  id={name}
                  type={type}
                  {...register(name as any, {
                    onChange: () => clearErrors('root'),
                  })}
                  className='input input-bordered w-full'
                />
                {(errors as any)[`${name}`]?.message && (
                  <p className='text-red-400 absolute w-full -bottom-1 left-1/2 -translate-x-1/2 text-center'>
                    {(errors as any)[`${name}`]?.message}
                  </p>
                )}
              </div>
            ))}
            {errors.root?.message && <p className='text-red-400 w-full text-center'>{errors.root?.message}</p>}
            <button type='submit' disabled={!isValid} className='btn btn-primary w-full'>
              {action}
            </button>
          </form>
          <p className={isSignUp ? 'text-sm text-center mt-4' : 'hidden'}>
            Already have an account?{' '}
            <NavLink to='/signin' className='link link-primary font-semibold'>
              Sign In
            </NavLink>
          </p>
          <p className={!isSignUp ? 'text-sm text-center mt-4' : 'hidden'}>
            Don&apos;t have an account?{' '}
            <NavLink to='/signup' className='link link-primary font-semibold'>
              Sign Up
            </NavLink>
          </p>
          <p className='text-sm text-center'>
            <a
              onClick={() => {
                UrlState.lastUrlGenerated.set(none)
                navigate('/')
              }}
              className='link link-primary font-semibold'
            >
              Continue as guest
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
