// ** react
import { useState } from 'react'

// ** components
import { CreateCourseForm } from './create-couser-form'
import { AddChapterForm } from './add-chapter-form'

const CreateCoursePage = () => {
  const [courseId, setCourseId] = useState<string | null>(null)

  const handleCourseCreated = (course: { _id: string }) => {
    setCourseId(course._id)
  }

  return (
    <div className='mt-4'>
      <h1 className='text-center text-2xl font-bold mb-5'>Tạo khóa học</h1>
      {!courseId ? <CreateCourseForm onCourseCreated={handleCourseCreated} /> : <AddChapterForm courseId={courseId} />}
    </div>
  )
}

export default CreateCoursePage
