// ** router
import { authRoute } from '@/router/auth.route'

// ** react router
import { Link } from 'react-router-dom'

// ** components
import { LoginForm } from './login-form'

const LoginPage = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center h-screen my-auto'>
        <div className='max-w-[350px] w-full'>
          <h1 className='font-semibold text-2xl text-center '>Đăng nhập</h1>
          <LoginForm></LoginForm>
        </div>
        <Link className='mt-6 underline' to={authRoute.resetPassword.path}>
          {' '}
          Quên mật khẩu ?{' '}
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
