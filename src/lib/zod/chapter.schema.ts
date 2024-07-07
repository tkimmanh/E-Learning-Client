import { z } from 'zod'

export const formSchema = z.object({
  chapterTitle: z.any(),
  videoTitle: z.any(),
  videoFile: z.any(),
  description: z.any()
})
