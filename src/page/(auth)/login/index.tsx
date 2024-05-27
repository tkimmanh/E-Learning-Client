import { LoginForm } from './login-form'

const LoginPage = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center h-screen my-auto'>
        <div className='max-w-[350px] w-full'>
          <h1 className='font-semibold text-2xl text-center '>Đăng nhập</h1>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
