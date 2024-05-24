import { RegisterForm } from './register-form'

const RegisterPage = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center h-screen my-auto'>
        <div className='max-w-[350px] w-full '>
          <h1 className='font-semibold text-2xl text-center '>Tạo tài khoản</h1>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
