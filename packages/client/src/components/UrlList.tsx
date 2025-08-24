import type { UrlType } from '../../graphql/generated/server.sdk'
import { useSnackbar } from 'notistack'

interface UrlRowProps {
  url: Partial<UrlType>
}

const UrlRow = ({ url }: UrlRowProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const onCopy = async () => {
    await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${url.slug!}`)
    enqueueSnackbar('Copied!', {
      autoHideDuration: 800,
      preventDuplicate: true,
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'bottom',
      },
      variant: 'success',
    })
  }

  return (
    <li className='list-row h-16'>
      <div className='text-4xl font-thin opacity-30 tabular-nums'>{url.clickCount}</div>
      <div className='list-col-grow items-center flex flex-col'>
        <div className='text-xs font-semibold opacity-60 my-auto'>
          {import.meta.env.VITE_BASE_URL}/{url.slug}
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
