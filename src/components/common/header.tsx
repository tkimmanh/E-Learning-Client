// ** react
import { Link } from 'react-router-dom'

// ** component
import { ModeToggle } from '../mode-toggle'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

// ** redux
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { logoutThunk } from '@/redux/auth/action'

// ** hooks
import { useAppDispatch } from '@/hooks/useAppDispatch'

// ** config
import { authRoute } from '@/router/auth.route'
import { dashboardRoute } from '@/router/dashboard.route'
import { courseRoute } from '@/router/course.route'
import { INSTRUCTOR_ROLE } from '@/config/role.config'

const Header = ({ className }: { className?: string }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch()
  return (
    <div className={`flex justify-between px-5 h-16 border-b-[0.5px] border-gray-800 ${className}`}>
      <Link to='/' className='font-bold text-lg rounded-lg my-auto'>
        E-Learning
      </Link>
      <div className='flex items-center mx-9'>
        <div className='px-2 py-1 my-auto'>
          <ModeToggle />
        </div>
        {!isAuthenticated ? (
          <>
            <Link to={authRoute.login.path} className='px-2 py-1 my-auto text-gray-400'>
              Đăng nhập
            </Link>
            <Link to={authRoute.register.path} className='px-2 py-1 my-auto text-gray-400'>
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            <div>
              <Link to={courseRoute.cart.path} className='px-2 py-1 my-auto text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                  />
                </svg>
              </Link>
            </div>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback className='w-10 h-10 bg-[#27272a] rounded-full p-[8px] text-sm ml-3 text-center font-medium'>
                    {user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align='end' className='w-56 p-0'>
                <div className='text-start w-full'>
                  <div className='w-full p-2'>
                    <p className='text-sm w-full font-medium'>{user?.name}</p>
                    <span className='text-xs w-full text-[#a1a1aa]'>{user?.email}</span>
                  </div>
                  <div className='w-full border-inherit border-b'></div>
                  <div className='w-full p-2 flex flex-col gap-y-3'>
                    <Link className='' to={'/'}>
                      Tài khoản
                    </Link>
                  </div>
                  {user?.role.includes(INSTRUCTOR_ROLE) && (
                    <div className='w-full p-2 flex flex-col gap-y-3'>
                      <Link className='' to={dashboardRoute.dashboard.path}>
                        Dashboard
                      </Link>
                    </div>
                  )}
                  <div className='w-full p-2 flex flex-col gap-y-3'>
                    <Link className='' to={courseRoute.myCourse.path}>
                      Khóa học đã mua
                    </Link>
                  </div>
                  <div className='w-full p-2'>
                    <button onClick={() => dispatch(logoutThunk())} className='cursor-pointer '>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
