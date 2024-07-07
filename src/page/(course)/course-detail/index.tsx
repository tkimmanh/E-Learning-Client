// react
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// component
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// hooks
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'

// redux
import { RootState } from '@/redux/store'
import { getDetailCourseThunk } from '@/redux/course/action'
import { addToCartThunk } from '@/redux/cart/actions'

// types
import { IChapter } from '@/types/couser'

// dayjs
import dayjs from 'dayjs'

// utils
import { formatCurrencyVND } from '@/lib/utils'

// ** api
import { createPaymentApi } from '@/redux/payment/action'

import { ILink } from '@/types/link'
import { addFreeCourseApi } from '@/apis/course.api'
import { currentUserThunk } from '@/redux/auth/action'
import { toast } from 'react-toastify'

const DetailCoursePage = () => {
  const { courseId } = useParams()

  const { course, loading } = useAppSelector((state: RootState) => state.course)

  const { user } = useAppSelector((state: RootState) => state.auth)

  // const { loading: loadingPayment } = useAppSelector((state: RootState) => state.payment)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDetailCourseThunk(courseId as string))
  }, [courseId, dispatch])

  const handleCreatePayment = async (courseId: string) => {
    dispatch(createPaymentApi(courseId)).then((action) => {
      if (createPaymentApi.fulfilled.match(action)) {
        const paymentLinks = (action.payload as IPayment)?.links
        const approvalLink = paymentLinks?.find((link: ILink) => link.rel === 'approval_url')
        if (approvalLink) {
          window.location.href = approvalLink.href
        }
      }
    })
  }

  const handleAddCourseFree = async (courseId: string) => {
    try {
      const res = await addFreeCourseApi(courseId)
      if (res.status === 200) {
        dispatch(currentUserThunk())
        toast.success('Tham gia khóa học thành công')
        navigate(`/course/play/${courseId}`)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  if (!course && !loading) {
    return <div className='text-center text-xl font-normal mt-10'>404 | Not Found</div>
  }

  const discountedPrice = (course?.price ?? 0) - (course?.price ?? 0) * ((course?.discount ?? 0) / 100)

  return (
    <div className='mt-10 mx-5 '>
      <div className='mb-10'>
        <div className='mb-6'>
          <h1 className='capitalize text-3xl font-bold '>{course?.name}</h1>
          <div className='mt-8 flex gap-x-12'>
            <span className='text-base'>Tác giả: Nguyễn Văn A</span>
            <span className='text-base'>Cập nhật: {dayjs(course?.updatedAt).format('DD/MM/YYYY')}</span>
          </div>
        </div>
        <div className='grid grid-cols-10 gap-x-11'>
          <div className='col-span-7'>
            <img src={course?.image} alt='' className='w-full h-[520px] object-cover' />
          </div>
          <div className='col-span-3'>
            <Card>
              <CardContent>
                <CardHeader className='p-0 py-5'>
                  <CardTitle>
                    <div className='flex flex-col gap-y-5'>
                      {course?.price && course?.price > 0 ? (
                        <del className='text-2xl text-gray-500 font-semibold'>
                          {formatCurrencyVND(course?.price ?? 0)}
                        </del>
                      ) : (
                        <span className='text-2xl text-gray-500 font-semibold'>Miễn phí</span>
                      )}
                      <div className='flex gap-x-5'>
                        {course?.price && course.price > 0 ? (
                          <span className='text-2xl font-semibold '>{formatCurrencyVND(discountedPrice) || 0}</span>
                        ) : (
                          <div className='hidden'></div>
                        )}
                        {course?.price && course.price > 0 ? (
                          <Button className='cursor-none text-black bg-white px-2'>
                            Tiết kiệm {course?.discount}%
                          </Button>
                        ) : (
                          <div className='hidden'></div>
                        )}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardDescription>
                  <ul className='flex flex-col gap-y-5 text-base font-normal text-white '>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                    <li>Cung cấp doc, source code Github tập đầy đủ</li>
                  </ul>
                  <div className='mt-5'>
                    {user?.courses.includes(course?._id as string) ? (
                      <Button onClick={() => navigate(`/course/play/${course?._id}`)} className='w-full py-1 mb-3'>
                        Học ngay
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          course?.price
                            ? handleCreatePayment(course?._id as string)
                            : handleAddCourseFree(course?._id as string)
                        }
                        className='w-full py-1 mb-3'
                      >
                        {course?.price ? 'Mua ngay' : 'Tham gia khóa học'}
                      </Button>
                    )}
                    {!user?.courses.includes(course?._id as string) && (
                      <Button
                        onClick={() => {
                          return dispatch(addToCartThunk(course?._id as string))
                        }}
                        className='w-full py-1 text-white'
                        variant={'outline'}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-5 mx-2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                          />
                        </svg>
                        Thêm vào giỏ hàng
                      </Button>
                    )}
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <div className='w-full mb-5'>
          <p className='text-xl font-normal'>{course?.description}</p>
        </div>
        <div className='w-full mb-5'>
          <Tabs defaultValue='content' className='w-full'>
            <TabsList className='w-full'>
              <TabsTrigger value='content' className='w-full'>
                Nội dung học tập
              </TabsTrigger>
              <TabsTrigger value='author' className='w-full'>
                Tác giả
              </TabsTrigger>
              <TabsTrigger value='review' className='w-full'>
                Đánh giá
              </TabsTrigger>
            </TabsList>
            <TabsContent className='w-full' value='content'>
              <h1 className='mb-4 text-2xl font-semibold'>Bạn sẽ nhận được</h1>
              <ul className='flex flex-col flex-wrap gap-y-4 max-h-[144px] text-[16px] font-normal'>
                <li>Học NextJs 14 bằng TypeScript mới nhất hiện nay</li>
                <li>Dự án có thể dng để viết vào CV hoặc làm đồ án tốt nghiệp ở các trường Đại học</li>
                <li>Cung cấp full source code FrontEnd và BackEnd</li>
                <li>Dự án có thể mở rộng thêm tính năng, không chỉ dừng lại trong phạm vi khóa học</li>
                <li>
                  Không cần tốn thời gian cho việc code CSS, vì mình cung cấp template UI sẵn, chỉ cần code logic
                  Next.js
                </li>
                <li>Ngoài Next.Js thì còn được học thêm về SEO, BackEnd</li>
              </ul>
            </TabsContent>
            <TabsContent className='w-full' value='author'>
              <p className='font-medium text-xl'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
            </TabsContent>
            <TabsContent className='w-full' value='review'></TabsContent>
          </Tabs>
        </div>
      </div>
      <h1 className='text-2xl font-semibold'>Nội dung học tập</h1>
      <Accordion type='single' collapsible>
        {course?.chapters.map((chapter: IChapter, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{chapter.title}</AccordionTrigger>
            <AccordionContent>
              {chapter.videos.map((video, videoIndex) => (
                <div key={videoIndex}>
                  <button className='mb-2 flex gap-x-2 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z'
                      />
                    </svg>
                    {video.title}
                  </button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default DetailCoursePage
