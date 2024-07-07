import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(6, { message: 'Không được dưới 6 k tự' }).max(64, { message: 'Không được quá 64 k tự' }),
  description: z.string().min(6, { message: 'Không được dưới 6 k tự' }).max(64, { message: 'Không được quá 64 k tự' }),
  price: z.any(),
  paid: z.any().default('false'),
  image: z.any(),
  published: z.boolean().default(false),
  discount: z.any()
})
