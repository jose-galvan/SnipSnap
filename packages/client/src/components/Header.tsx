import { NavLink, useLocation } from 'react-router'
import { useUser } from '../hooks/useUser'

interface NavItem {
  name: string
  path: string
}

const NavItems: Record<string, NavItem[]> = {
  ['/dashboard']: [{ name: 'Home', path: '/' }],
  ['/']: [{ name: 'Dashboard', path: '/dashboard' }],
}

const Drawer = () => {
  const { isAuthenticated, logOut } = useUser()
  const location = useLocation()

  const navItems: NavItem[] = NavItems[location.pathname]

  return (
    <div className='flex gap-2 col-start-3 ml-auto mr-3'>
      {isAuthenticated && (
        <div className='dropdown  dropdown-end'>
          <div tabIndex={0} role='button' className='btn m-1  my-auto rounded-full h-14 w-14 flex'>
            <span className='gg-boy w-10 m-auto'></span>
          </div>
          <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
            {navItems.map(item => {
              return (
                <li key={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              )
            })}
            <li onClick={logOut}>
              <a>Log Out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
const Header = () => {
  return (
    <header className='bg-neutral-content h-16 w-full content-center grid grid-flow-col grid-cols-[8rem_1fr_8rem]'>
      <NavLink to='/' className='grid grid-cols-[5rem_1rem_5rem] grid-flow-col mx-auto my-auto col-start-2 gap-1'>
        <span className='text-3xl font-semibold text-right'>Snip</span>
        <div className='gg-link m-auto'></div>
        <span className='text-3xl font-semibold text-left'>Snap</span>
      </NavLink>
      <Drawer></Drawer>
    </header>
  )
}
export default Header
