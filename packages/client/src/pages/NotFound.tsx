import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-9xl'>Oops!</h1>
          <p className='py-6'>
            <p className='text-xl text-base-content/70'>404 -Page not found.</p>
            <p className='text-base text-base-content/60 max-w-md'>
              The link you are looking for doesn't exist.
            </p>
          </p>
          <button className='btn btn-secondary mt-4' onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
