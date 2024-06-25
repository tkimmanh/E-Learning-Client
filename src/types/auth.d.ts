import { SuccessResponse } from './utils'

export type TAuth = {
  name: string
  email: string
  password: string
}

export type TUserResponse = SuccessResponse<{
  user: {
    _id: string
    name: string
    email: string
    picture: string
    role: string[]
    stripe_account_id: string
    courses: string[]
  }
}>
