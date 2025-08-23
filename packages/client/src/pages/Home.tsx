import { useCreateSlugMutation, type CreateSlugInput, type UrlType } from '../../graphql/generated/server.sdk'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'

const FormSchema = yup
  .object({
    url: yup.string().url('Please enter a valid URL').required('Enter a url'),
    slug: yup.string().optional(),
  })
  .required()

export default function Home() {
  const [_urlRecord, setUrl] = useState<Partial<UrlType> | null>(null)
  const [createSlug] = useCreateSlugMutation()

  const form = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form

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
      console.log('Error', result.error)
    }
    if (result.data?.createUrl) {
      setUrl(result.data?.createUrl)
      setValue('slug', `${import.meta.env.VITE_BASE_URL}/${result.data?.createUrl.slug}`)
    }
  }

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center -translate-y-16'>
        <div className='max-w-md'>
          <h1 className='text-4xl font-bold text-gray-400 mb-4 mx-auto'>Chop Chop Your Link!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 flex items-center bg-base-200 justify-center'>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs  p-4'>
              <div className='join'>
                <input {...register('url')} className='input join-item' placeholder='URL...' />
                <button disabled={!isValid} type='submit' className='btn btn-primary join-item'>
                  Chop
                </button>
              </div>
              {errors.url?.message && <p className='text-red-400'>{errors.url?.message}</p>}
              <input
                {...register('slug')}
                hidden={!_urlRecord?.slug}
                type='text'
                placeholder='Type here'
                className='input input-ghost mt-12'
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}
