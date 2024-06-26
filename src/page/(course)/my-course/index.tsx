import { useEffect, useState } from 'react'
import { listCourseUserApi } from '@/apis/course.api'
import { ICourse } from '@/types/couser'
import CardMain from '@/components/card-main'
import { useAppSelector } from '@/hooks/useAppSelector'

const MyCoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    async function fetchCourseUser() {
      const res = await listCourseUserApi()
      setCourses(res.data.result)
    }
    fetchCourseUser()
  }, [])

  return (
    <div>
      <h1 className='text-center my-2 text-2xl font-bold mt-4'> Khóa học đã mua</h1>
      {courses.length > 0 ? (
        courses.map((course: ICourse) => {
          return (
            <CardMain
              userCourse={user?.courses?.includes(course?._id as string) ?? false}
              key={course?._id}
              name={course?.name}
              price={course?.price}
              image={course?.image as string}
              courseId={course?._id as string}
            />
          )
        })
      ) : (
        <div className='flex items-center justify-center h-screen uppercase gap-x-4 text-[#808080]'>
          <p className=''>Bạn chưa mua khóa học nào</p>
          <span>
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
                d='M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z'
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  )
}

export default MyCoursePage
