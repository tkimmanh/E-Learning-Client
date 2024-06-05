// ** components
import { ResetPasswordForm } from './reset-password-form'

const ForgotPasswordPage = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center h-screen my-auto'>
        <div className='max-w-[350px] w-full'>
          <h1 className='font-semibold text-2xl text-center '>Quên mật khẩu</h1>
          <ResetPasswordForm></ResetPasswordForm>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
