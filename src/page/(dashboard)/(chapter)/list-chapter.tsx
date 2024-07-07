import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getDetailCourseThunk } from '@/redux/course/action'
import { RootState } from '@/redux/store'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const ListChaptersPage = () => {
  const { courseId } = useParams()
  const dispatch = useAppDispatch()
  const { course } = useAppSelector((state: RootState) => state.course)

  useEffect(() => {
    async function fetchCourse() {
      try {
        await dispatch(getDetailCourseThunk(courseId as string))
      } catch (error) {
        console.error('Error fetching course:', error)
      }
    }
    fetchCourse()
  }, [dispatch, courseId])

  return (
    <div className='mt-10'>
      <h1 className='text-center text-2xl font-bold mb-5'>Chapters</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chapter Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course?.chapters.map((chapter) => (
            <TableRow key={chapter._id}>
              <TableCell>{chapter.title}</TableCell>
              <TableCell>
                <Link to={`/course/${courseId}/chapter/${chapter._id}`}>
                  <Button variant='secondary'>Chỉnh sửa</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ListChaptersPage
