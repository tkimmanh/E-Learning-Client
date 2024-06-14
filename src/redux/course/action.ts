// ** lib
import http from '@/lib/axios'

// ** redux
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'course'

export const getCoursesThunk = createAsyncThunk('course/getCourses', async () => {
  try {
    const response = await http.get(`${BASE_URL}/list-course`)
    return response.data
  } catch (error) {
    console.log('error list course', error)
  }
})

export const getDetailCourseThunk = createAsyncThunk('course/getDetailCourse', async (courseId: string) => {
  try {
    const response = await http.get(`${BASE_URL}/detail-course/${courseId}`)
    return response.data
  } catch (error) {
    console.log('error detail course', error)
  }
})
