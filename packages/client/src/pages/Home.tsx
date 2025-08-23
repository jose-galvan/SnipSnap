import { useState } from 'react'
import { useCreateSlugMutation, type UrlType } from '../../graphql/generated/server.sdk'

export default function Home() {
  const [url, setUrl] = useState<string>('')
  const [, setCreated] = useState<Partial<UrlType> | null>(null)
  const [createSlug] = useCreateSlugMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    const result = await createSlug({
      variables: {
        input: {
          url,
        },
      },
    })
    if (result.data?.createUrl) {
      setCreated(result.data?.createUrl)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-gray-400 h-16 w-full'></div>

      {/* Main Content */}
      <div className='max-w-2xl mx-auto px-6 py-12'>
        <h1 className='text-4xl font-bold text-gray-800 mb-12'>Chop Chop You URL! 🔗</h1>

        <p className='text-xl text-gray-600 mb-8'>Enter the URL to shorten</p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='url' className='block text-lg font-medium text-gray-700 mb-2'>
              URL
            </label>
            <input
              type='url'
              id='url'
              value={url}
              onChange={e => setUrl(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='https://example.com'
              required
            />
          </div>

          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md text-lg transition-colors duration-200'
          >
            Shorten
          </button>
        </form>
      </div>
    </div>
  )
}