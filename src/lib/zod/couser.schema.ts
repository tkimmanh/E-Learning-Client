import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(6, { message: 'Không được dưới 6 k tự' }).max(64, { message: 'Không được quá 64 k tự' }),
  description: z.string().min(6, { message: 'Không được dưới 6 k tự' }).max(64, { message: 'Không được quá 64 k tự' }),
  price: z
    .string()
    .min(0, { message: 'Không được dưới 0' })
    .max(1000000000, { message: 'Không được quá 100.000.0000 đồng' }),
  paid: z.string().default('false'),
  image: z.any()
})
