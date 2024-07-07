import { SuccessResponse } from './utils'

export interface ICourse {
  _id?: string
  name: string
  description: string
  price: number
  paid: boolean | string
  published: boolean
  discount: number
  image: string | FileList
  chapters: IChapter[]
}
export interface IChapter {
  _id: string
  title: string
  videos: {
    title: string
    url: string
    _id: string
    description: string
    createdAt: string
    updatedAt: string
  }[]
}
export type CourseState = {
  map(arg0: (course: ICourse) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode
  chapters: IChapter[]
  createdAt: string
  description: string
  image: string
  name: string
  paid: boolean
  price?: number
  published: boolean
  discount?: number
  updatedAt: string
  _id: string
} | null

export type CourseStateSuccess = SuccessResponse<CourseState>
export interface IVideo {
  title: string
  file: File
  url?: string
  description?: string
}
