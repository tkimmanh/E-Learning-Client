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
import { authRoute } from '@/router/auh.route'

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
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarFallback className='w-10 h-10 bg-[#27272a] rounded-full p-[8px] text-sm text-center font-medium'>
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
                <div className='w-full border-inherit border-b'></div>
                <div className='w-full p-2'>
                  <button onClick={() => dispatch(logoutThunk())} className='cursor-pointer '>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}

export default Header
