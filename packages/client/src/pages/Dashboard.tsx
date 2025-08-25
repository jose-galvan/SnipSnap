import { useEffect } from 'react'
import {
  useCountClicksQuery,
  useMostPopularQuery,
  useMostRecentQuery,
  useCountQuery,
  type UrlType,
} from '@generated/server.sdk'
import Header from '../components/Header'
import UrlList from '../components/UrlList'
import { useUser } from '../hooks/useUser'

const Dashboard = () => {
  const popular = useMostPopularQuery()
  const recent = useMostRecentQuery()
  const countClicks = useCountClicksQuery()
  const count = useCountQuery()

  const { logOut, isAuthenticated } = useUser()
  useEffect(() => {
    if (!isAuthenticated) {
      logOut()
    }
  }, [isAuthenticated])
  useEffect(() => {
    if ([popular.error?.message, recent.error?.message].includes('Unauthorized')) {
      logOut()
    }
  }, [popular, recent])

  return (
    <div className='min-h-screen flex items-center bg-base-200 flex-col max-h-screen'>
      <Header></Header>
      <div className='content mt-4 w-full p-4 flex-col flex items-center gap-y-3'>
        <div className='bg-base-100  stats shadow'>
          <div className='stat place-items-center'>
            <div className='stat-title'>Short Links</div>
            <div className='stat-value'>{count.data?.count}</div>
            <div className='stat-desc'>Total short urls created </div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title'>Clicks</div>
            <div className='stat-value text-primary-content'>{countClicks.data?.countClicks}</div>
            <div className='stat-desc text-primary-content'>Total url clicks</div>
          </div>
        </div>
        <div className='flex w-full justify-center gap-4 h-[70vh] max-h-[70vh]'>
          {recent.data?.mostRecent && (
            <UrlList title='Recent URLS' urls={recent.data?.mostRecent as Partial<UrlType>[]}></UrlList>
          )}
          {popular.data?.mostPopular.length && (
            <UrlList title='Most Popular URLS' urls={popular.data?.mostPopular as Partial<UrlType>[]}></UrlList>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
