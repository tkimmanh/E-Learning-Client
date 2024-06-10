// ** hooks
import { useAppSelector } from '@/hooks/useAppSelector'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// ** components
import { Button } from '@/components/ui/button'

// ** api
import { makeInstructorApi } from '@/apis/instructor.api'

// ** zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const BecomeInstructorPage = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useAppSelector((state) => state.auth)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(
      z.object({
        paypal_email: z.string().email()
      })
    ),
    defaultValues: {
      paypal_email: ''
    }
  })

  const handleMakeInstructor = async (value: { paypal_email: string }) => {
    setLoading(true)
    await makeInstructorApi(value)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        setLoading(false)
        window.location.href = res.data
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='py-10 flex flex-col items-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-5 text-gray-200'>Trở thành người bán khóa học</h1>
        <p className='text-xl text-[#a1a1aa] '>Thiết lập khoản thanh toán để xuất bản các khóa học trên E-demy</p>
      </div>
      <div className='py-5 flex flex-col items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-48'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
          />
        </svg>
        <form onSubmit={form.handleSubmit(handleMakeInstructor)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name='paypal_email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email PayPal' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={handleMakeInstructor}
              disabled={user ? user.role.includes('Instructor') : false || loading}
              className='mt-5'
            >
              <div className='flex items-center gap-2'>
                Thiết lập khoản thanh toán
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
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                </svg>
              </div>
            </Button>
          </Form>
        </form>
      </div>

      <p className='mt-5'>Bạn sẽ được chuyển hướng đến sọc để hoàn tất quá trình giới thiệu.</p>
    </div>
  )
}

export default BecomeInstructorPage
