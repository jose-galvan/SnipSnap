import { useLocation, useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSignInMutation, useSignUpMutation } from '../../graphql/generated/server.sdk'
import { AuthState, type AuthUser } from '../state/auth.state'
import { decodeToken } from '../utils/token'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'

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
  const isSignUp = location.pathname.includes('signup')
  const navigate = useNavigate()

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
        navigate('/')
      }
    } catch (error) {
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
      await handleMutation(data, signUp)
    } else {
      await handleMutation(data, signIn)
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
                <input id={name} type={type} {...register(name as any)} className='input input-bordered w-full' />
                {(errors as any)[`${name}`]?.message && (
                  <p className='text-red-400 absolute w-full -bottom-1 left-1/2 -translate-x-1/2 text-center'>
                    {(errors as any)[`${name}`]?.message}
                  </p>
                )}
              </div>
            ))}

            <button type='submit' disabled={!isValid} className='btn btn-primary w-full'>
              {action}
            </button>
          </form>
          <p className={isSignUp ? 'text-sm text-center mt-4' : 'hidden'}>
            Already have an account?{' '}
            <a href='/signin' className='link link-primary'>
              Sign In
            </a>
          </p>
          <p className={!isSignUp ? 'text-sm text-center mt-4' : 'hidden'}>
            Don't have an account?{' '}
            <a href='/signup' className='link link-primary'>
              Sign up
            </a>
          </p>
          <p className='text-sm text-center'>
            <a href='/' className='link link-primary'>
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
