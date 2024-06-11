// ** lib
import http from '@/lib/axios'

// ** type
import { ICourse } from '@/types/couser'

const BASE_URL = '/course'

export const uploadImageCourseApi = (body: FormData) => {
  return http.post(`${BASE_URL}/upload-image`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteImageCourseApi = (body: { imageUrl: string }) => {
  return http.delete(`${BASE_URL}/delete-image`, { data: body })
}

export const createCourseApi = (body: ICourse) => {
  return http.post(`${BASE_URL}/create-course`, body)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createChapterApi = (body: { courseId: string; chapterData: any }) => {
  return http.post(`${BASE_URL}/create-chapter`, body)
}

export const uploadVideoApi = (body: FormData) => {
  return http.post(`${BASE_URL}/upload-video`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteVideoApi = (body: { videoUrl: string }) => {
  return http.delete(`${BASE_URL}/delete-video`, { data: body })
}
