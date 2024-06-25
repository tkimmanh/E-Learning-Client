// ** components
import CardMain from '@/components/card-main'

// ** hook
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { currentUserThunk } from '@/redux/auth/action'

// ** redux
import { getCoursesThunk } from '@/redux/course/action'

// ** types
import { CourseState } from '@/types/couser'

// ** react
import { useEffect } from 'react'

const ListCoursePage = () => {
  const dispatch = useAppDispatch()
  const { courses } = useAppSelector((state) => state.course)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getCoursesThunk()).then(() => {
      dispatch(currentUserThunk())
    })
  }, [dispatch])

  return (
    <div className='flex gap-x-5 flex-wrap mt-10'>
      {Array.isArray(courses) &&
        courses.map((course: CourseState) => {
          return (
            <CardMain
              userCourse={user?.courses?.includes(course?._id as string) ?? false}
              key={course?._id}
              name={course?.name}
              price={course?.price}
              image={course?.image}
              courseId={course?._id as string}
            />
          )
        })}
    </div>
  )
}

export default ListCoursePage
