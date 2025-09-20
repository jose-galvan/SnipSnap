import { NavLink, useLocation, useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  useSignInMutation,
  useSignUpMutation,
  useSetUrlOwnerMutation,
  type SignInInput,
  type SignUpInput,
} from '@generated/server.sdk'
import { useAuth } from '../state/auth.state'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useUrlState } from '../state/url.state'
import { isGraphQLError } from '../utils/error'
import { DEFAULT_SNACKBAR_CONFIG } from '../utils/snackbar'

type FormData = SignInInput | SignUpInput

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

const fields: Array<{ name: keyof FormData; label: string; type: string }> = [
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
  const { lastGenerated, clear } = useUrlState()
  const { isAuthenticated } = useUser()
  const { updateToken } = useAuth()
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
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const handlePostAuth = async () => {
    if (lastGenerated?.id && !lastGenerated.createdById) {
      await setOwner({
        variables: {
          id: lastGenerated.id,
        },
      })
    }
    clear()
    navigate('/')
  }

  const handleSignIn = async (input: SignInInput) => {
    try {
      const response = await signIn({ variables: { input } })
      if (response.data?.signIn) {
        updateToken(response.data.signIn.access_token)
        await handlePostAuth()
      }
    } catch (err: unknown) {
      handleAuthError(err)
    }
  }

  const handleSignUp = async (input: SignUpInput) => {
    try {
      const response = await signUp({ variables: { input } })
      if (response.data?.signUp) {
        updateToken(response.data.signUp.access_token)
        await handlePostAuth()
      }
    } catch (err: unknown) {
      handleAuthError(err)
    }
  }

  const handleAuthError = (err: unknown) => {
    if (isGraphQLError(err)) {
      const hasUnauthorizedError = err.errors.some(e => e.message.includes('Unauthorized'))
      if (hasUnauthorizedError) {
        setError('root', { message: 'Invalid username or password' })
        return
      }
    }
    enqueueSnackbar('Something went wrong! Try again later.', {
      ...DEFAULT_SNACKBAR_CONFIG,
      variant: 'error',
    })
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    if (!isValid) return

    if (isSignUp) {
      return handleSignUp(data)
    } else {
      return handleSignIn(data)
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
                  {...register(name, {
                    onChange: () => clearErrors('root'),
                  })}
                  className='input input-bordered w-full'
                />
                {errors[name]?.message && (
                  <p className='text-red-400 absolute w-full -bottom-1 left-1/2 -translate-x-1/2 text-center'>
                    {errors[name]?.message}
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
                clear()
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
