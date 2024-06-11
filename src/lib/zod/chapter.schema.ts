import { z } from 'zod'

export const formSchema = z.object({
  chapterTitle: z.string(),
  videoTitle: z.string(),
  videoFile: z.any()
})
