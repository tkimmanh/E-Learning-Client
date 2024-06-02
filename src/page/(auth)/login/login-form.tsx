// ** components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// ** zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ** schema
import { formSchema } from '@/lib/zod/login.schema'

// ** react-router-dom
import { useNavigate } from 'react-router-dom'

// ** config
import { authRoute } from '@/router/auh.route'

// ** hooks
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'

// ** redux
import { currentUserThunk, loginThunk } from '@/redux/auth/action'

// ** router
import { commonRoutes } from '@/router/common.route'

export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading } = useAppSelector((state) => state.auth)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginThunk(values)).then(() => {
      navigate(commonRoutes.home.path)
      dispatch(currentUserThunk())
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
          <Button type='submit'>Đăng nhập</Button>
        </form>
      </Form>
      <div className='flex items-center justify-center'>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
        <h1 className='text-gray-400 w-full text-xs text-center font-semibold my-7'>NẾU BẠN CHƯA CÓ TÀI KHOẢN</h1>
        <div className='w-1/2 bg-gray-800 h-[0.1px]'></div>
      </div>
      <Button
        disabled={loading}
        onClick={() => navigate(authRoute.register.path)}
        className='w-full border '
        variant={'ghost'}
      >
        {loading ? '...' : 'Đăng nhập'}
      </Button>
    </>
  )
}
