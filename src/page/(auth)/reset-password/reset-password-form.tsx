// ** react
import { useState } from 'react'

// ** components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// ** zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ** schema
import { resetPasswordSchema } from '@/lib/zod/reset-password.ts'
import { forgotPasswordSchema } from '@/lib/zod/forgot-password.schema'

// ** react-router-dom
import { useNavigate } from 'react-router-dom'
// ** api
import { forgotPasswordApi, resetPasswordApi } from '@/apis/auth.api'

// ** config
import { authRoute } from '@/router/auh.route'
import { toastConfig } from '@/config/toast.config'

// ** toast
import { toast } from 'react-toastify'

type ForgotPasswordValues = { email: string }
type ResetPasswordValues = { new_password: string; short_code: string }

export function ResetPasswordForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const formSchema = success ? resetPasswordSchema : forgotPasswordSchema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      new_password: '',
      short_code: ''
    }
  })

  async function onSubmit(values: ForgotPasswordValues | ResetPasswordValues) {
    setLoading(true)
    if (!success) {
      await forgotPasswordApi(values as ForgotPasswordValues)
        .then(() => {
          toast.success('Mã xác nhận đã được gửi đến email của bạn!', toastConfig)
          setSuccess(true)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      await resetPasswordApi(values as ResetPasswordValues)
        .then(() => {
          toast.success('Mật khẩu đã được đặt lại!', toastConfig)
          navigate(authRoute.login.path)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {!success ? (
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name='new_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='short_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã xác nhận</FormLabel>
                    <FormControl>
                      <Input type='string' placeholder='Mã được gửi đến email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button disabled={loading} type='submit'>
            {loading ? '...' : 'Xác nhận'}
          </Button>
        </form>
      </Form>
      <div className='flex items-center justify-center'>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
        <h1 className='text-gray-400 w-full text-xs text-center font-semibold my-7'>NẾU BẠN CHƯA CÓ TÀI KHOẢN</h1>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
      </div>
      <Button onClick={() => navigate(authRoute.register.path)} className='w-full border ' variant={'ghost'}>
        Đăng ký
      </Button>
    </>
  )
}
