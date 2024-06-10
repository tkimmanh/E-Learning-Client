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
