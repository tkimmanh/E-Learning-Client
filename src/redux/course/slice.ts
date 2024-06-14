import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// ** type
import { CourseState, CourseStateSuccess } from '@/types/couser'

// ** action
import { getCoursesThunk, getDetailCourseThunk } from './action'

type InitialState = {
  courses: CourseState
  course: CourseState
  loadingCourse: boolean
  loading: boolean
}

const initialState: InitialState = {
  courses: null,
  course: null,
  loadingCourse: false,
  loading: false
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  extraReducers(builder) {
    // ** list course
    builder.addCase(getCoursesThunk.fulfilled, (state, action: PayloadAction<CourseStateSuccess>) => {
      state.courses = action.payload.result
      state.loading = false
    })
    builder.addCase(getCoursesThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCoursesThunk.rejected, (state) => {
      state.loading = false
    })
    // ** detail course
    builder.addCase(getDetailCourseThunk.fulfilled, (state, action: PayloadAction<CourseStateSuccess>) => {
      state.course = action.payload.result
      state.loadingCourse = false
    })
    builder.addCase(getDetailCourseThunk.pending, (state) => {
      state.loadingCourse = true
    })
    builder.addCase(getDetailCourseThunk.rejected, (state) => {
      state.loadingCourse = false
    })
  },
  reducers: {}
})

export default courseSlice.reducer
