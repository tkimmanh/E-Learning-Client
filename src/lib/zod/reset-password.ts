import { z } from 'zod'

export const resetPasswordSchema = z.object({
  new_password: z.string().min(8, {
    message: 'Mật khẩu phải có ít nhất 8 k tự'
  }),
  short_code: z.string().min(6, {
    message: 'Mã đặt lại mật khẩu sai định dạng'
  })
})
