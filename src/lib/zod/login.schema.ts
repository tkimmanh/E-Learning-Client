import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email({
    message: 'Email sai định dạng'
  }),
  password: z.string().min(6, { message: 'Không được dưới 6 ký tự' }).max(64, { message: 'Không được quá 64 ký tự' })
})
