import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'

const Header = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-between px-5 h-16 border-b-[0.5px] border-gray-800 ${className}`}>
      <Link to='/' className='font-bold text-lg rounded-lg my-auto'>
        E-Learning
      </Link>
      <div className='flex items-center mx-9'>
        <div className='px-2 py-1 my-auto'>
          <ModeToggle />
        </div>
        <Link to='/login' className='px-2 py-1 my-auto text-gray-400'>
          Đăng nhập
        </Link>
        <Link to='/register' className='px-2 py-1 my-auto text-gray-400'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}

export default Header
