import type { UrlType } from '@generated/server.sdk'
import { useSnackbar } from 'notistack'
import { DEFAULT_SNACKBAR_CONFIG } from '../utils/snackbar'

interface UrlRowProps {
  url: Partial<UrlType>
}

const UrlRow = ({ url }: UrlRowProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const onCopy = async () => {
    await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${url.slug!}`)
    enqueueSnackbar('Copied!', {
      ...DEFAULT_SNACKBAR_CONFIG,
      variant: 'success',
    })
  }

  return (
    <li className='list-row h-16'>
      <div className='text-4xl font-thin opacity-30 tabular-nums'>{url.clickCount}</div>
      <div className='list-col-grow items-center flex flex-col'>
        <div className='my-auto'>
          <div className='tooltip' data-tip={url.originalUrl}>
            <span className='text-xs font-semibold opacity-60 cursor-pointer'>
              {import.meta.env.VITE_BASE_URL}/{url.slug}
            </span>
          </div>
        </div>
      </div>
      <button type='button' onClick={onCopy} className='btn btn-neutral'>
        Copy
      </button>
    </li>
  )
}

interface UrlListProps {
  title: string
  urls: Partial<UrlType>[]
}

const UrlList = ({ urls, title }: UrlListProps) => {
  return (
    <div className='flex flex-col overflow-y-auto overscroll-contain'>
      <ul className='list bg-base-100 rounded-box shadow-md w-[40vw] pb-2'>
        <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>{title}</li>
        {urls.map(url => {
          return <UrlRow key={url.id} url={url}></UrlRow>
        })}
      </ul>
    </div>
  )
}

export default UrlList
