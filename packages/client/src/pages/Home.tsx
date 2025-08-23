import { useCreateSlugMutation, type CreateSlugInput, type UrlType } from '../../graphql/generated/server.sdk'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import ShortUrlCard from '../components/ShorUrlCard'

const FormSchema = yup
  .object({
    url: yup.string().url('Please enter a valid URL').required('Enter a url'),
  })
  .required()

export default function Home() {
  const [shortUrl, setShortUrl] = useState<Partial<UrlType> | null>(null)
  const [createSlug] = useCreateSlugMutation()
  const { enqueueSnackbar } = useSnackbar()

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
    const result = await createSlug({
      variables: {
        input: {
          url: data.url,
        },
      },
    })
    if (result.error) {
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
    if (result.data?.createUrl) {
      setShortUrl(result.data?.createUrl)
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
    reset()
    setShortUrl(null)
  }

  return (
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
            {shortUrl && (
              <ShortUrlCard
                shortUrl={shortUrl}
                onClose={onCloseCard}
                onUpdate={updated => {
                  console.log('updated', updated)
                  setShortUrl(updated)
                }}
              ></ShortUrlCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
