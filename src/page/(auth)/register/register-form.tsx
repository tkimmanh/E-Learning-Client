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
import { formSchema } from '@/lib/zod/regiser.schema'

// ** react-router-dom
import { useNavigate } from 'react-router-dom'

// ** config
import { authRoute } from '@/router/auth.route'

// ** apis
import { registerApi } from '@/apis/auth.api'

// ** toastify
import { toast } from 'react-toastify'

// ** config
import { toastConfig } from '@/config/toast.config'

export function RegisterForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    await registerApi(values)
      .then(() => {
        toast.success('Đăng ký thành công', {
          ...toastConfig
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type='submit'>
            {loading ? '...' : 'Đăng ký'}
          </Button>
        </form>
      </Form>
      <div className='flex items-center justify-center'>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
        <h1 className='text-gray-400 w-full text-xs text-center font-semibold my-7'>NẾU BẠN ĐÃ CÓ TÀI KHOẢN</h1>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
      </div>
      <Button onClick={() => navigate(authRoute.login.path)} className='w-full border ' variant={'ghost'}>
        Đăng nhập
      </Button>
    </>
  )
}
