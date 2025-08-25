/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUpdateSlugMutation } from '@generated/server.sdk'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { UrlState } from '../state/url.state'
import { useHookstate } from '@hookstate/core'
import { useEffect } from 'react'
import { DEFAULT_SNACKBAR_CONFIG } from '../utils/snackbar'

interface ShortUrlCardProps {
  onClose: () => void
}

const FormSchema = yup
  .object({
    slug: yup.string().length(7).required('Enter a slug'),
  })
  .required()

const ShortUrlCard = ({ onClose }: ShortUrlCardProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [updateSlug] = useUpdateSlugMutation()
  const handleClose = () => {
    reset()
    onClose()
  }

  const shortUrl = useHookstate(UrlState).lastUrlGenerated

  useEffect(() => {
    if (shortUrl.value?.slug) {
      reset({ slug: shortUrl.value.slug! })
    }
  }, [shortUrl.value?.slug])

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      slug: shortUrl.value?.slug!,
    },
  })

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!isValid) return
    const res = await updateSlug({
      variables: {
        input: {
          id: shortUrl.value?.id!,
          slug: data.slug,
        },
      },
    })
    if (res.data?.updateSlug) {
      UrlState.lastUrlGenerated.set(res.data?.updateSlug)
      reset({ slug: res.data?.updateSlug.slug! })
      enqueueSnackbar('Short URL Updated!', {
        ...DEFAULT_SNACKBAR_CONFIG,
        variant: 'success',
      })
    }
  }

  const onCopySlug = async () => {
    await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${shortUrl.value?.slug!}`)
    enqueueSnackbar('Copied!', {
      ...DEFAULT_SNACKBAR_CONFIG,
      variant: 'success',
    })
  }

  return (
    <div className='card bg-base-100 w-96 shadow-sm absolute left-1/2 -translate-x-1/2'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title'>Your Shorten Link Is Ready! 🎉 </h2>
          <div className='card-actions justify-end'>
            <button className='btn btn-square btn-sm' onClick={handleClose}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6 flex flex-col mt-4'>
          <div className='h-14 relative w-80'>
            <div className='input join-item w-80'>
              <span className='translate-x-[9px]'>{import.meta.env.VITE_BASE_URL}/</span>
              <input {...register('slug')} className='' placeholder='Slug...' />
            </div>
            {errors.slug?.message && (
              <p className='text-red-400 absolute -bottom-1 w-full text-center'>{errors.slug?.message}</p>
            )}
          </div>
          <div className='card-actions justify-end'>
            {isDirty && (
              <button type='submit' className='btn btn-neutral'>
                Update
              </button>
            )}

            {!isDirty && (
              <button type='button' onClick={onCopySlug} className='btn btn-neutral'>
                Copy
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShortUrlCard
