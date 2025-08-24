import { useCreateSlugMutation, type CreateSlugInput } from '../../graphql/generated/server.sdk'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'
import ShortUrlCard from '../components/ShorUrlCard'
import validator from 'validator'
import Header from '../components/Header'
import { useUser } from '../hooks/useUser'
import { none, useHookstate } from '@hookstate/core'
import { UrlState } from '../state/url.state'
import { NavLink } from 'react-router'

const FormSchema = yup
  .object({
    url: yup
      .string()
      .test('is-url', 'Please enter a valid URL', value => {
        if (!value) return false
        return validator.isURL(value, {
          require_protocol: true,
          require_valid_protocol: true,
          protocols: ['http', 'https'],
        })
      })
      .required('Enter a url'),
  })
  .required()

export default function Home() {
  const [createSlug] = useCreateSlugMutation()
  const { enqueueSnackbar } = useSnackbar()
  const urlState = useHookstate(UrlState)
  const { isAuthenticated } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<CreateSlugInput> = async (data: CreateSlugInput) => {
    if (!isValid) return
    try {
      const result = await createSlug({
        variables: {
          input: {
            url: data.url,
          },
        },
      })
      if (result.data?.createUrl) {
        urlState.lastUrlGenerated.set(result.data?.createUrl)
        enqueueSnackbar('Your Short Link is Ready!', {
          autoHideDuration: 1200,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom',
          },
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong :( Try again later!', {
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

  useEffect(() => {
    // this is needed to trigger validation after browser autofill since
    // it's not supported by react-hook-form
    const field = document.getElementById('url') as HTMLInputElement
    const handler = () => {
      setValue('url', field.value, {
        shouldValidate: true,
      })
    }
    field.addEventListener('change', handler)
    return () => {
      field.removeEventListener('change', handler)
    }
  }, [])

  const onCloseCard = () => {
    urlState.lastUrlGenerated.set(none)
    reset()
  }

  return (
    <>
      <Header></Header>
      <div className='hero bg-base-200 h-[calc(100vh_-_64px)]'>
        <div className='hero-content text-center -translate-y-16 w-[50vw] h-[50vh]'>
          <div className='max-w-full w-full flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-gray-600 mb-4 mx-auto'>Short Your Link! </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full space-y-6 flex items-center bg-base-200 justify-center flex-col'
            >
              <div className='mt-4 min-h-16 h-16 w-full relative'>
                <div className='join'>
                  <input id='url' {...register('url')} className='input join-item w-80' placeholder='URL...' />
                  <button disabled={!isValid} type='submit' className='btn btn-primary join-item w-16'>
                    Short
                  </button>
                </div>
                {errors.url?.message && (
                  <p className='text-red-400 absolute -bottom-1 left-1/2 -translate-x-1/2'>{errors.url?.message}</p>
                )}
              </div>
            </form>
            <div className='w-full relative'>
              {urlState.lastUrlGenerated.value && <ShortUrlCard onClose={onCloseCard}></ShortUrlCard>}
            </div>
          </div>
        </div>
        {!isAuthenticated && (
          <p className='text-sm text-center mb-6 mt-auto'>
            <NavLink to='/signin' className='link link-primary font-semibold'>
              Sign In
            </NavLink>{' '}
            to save your short links.
          </p>
        )}
      </div>
    </>
  )
}
