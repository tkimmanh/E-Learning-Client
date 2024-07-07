// ** react
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// ** api
import { uploadVideoApi, createChapterApi, deleteVideoApi } from '@/apis/course.api'

// ** component
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// ** toast
import { toast } from 'react-toastify'

// ** config
import { toastConfig } from '@/config/toast.config'

// ** zod
import { z } from 'zod'

// ** lib
import { formSchema } from '@/lib/zod/chapter.schema'

// type
import { IVideo } from '@/types/couser'

interface AddChapterFormProps {
  courseId: string
}

export const AddChapterForm: React.FC<AddChapterFormProps> = ({ courseId }) => {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      chapterTitle: '',
      videoTitle: '',
      videoFile: null,
      description: ''
    }
  })

  const handleVideoUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('video', file)
    try {
      setLoading(true)
      const response = await uploadVideoApi(formData)
      return response.data.result
    } catch (error) {
      console.error('Error uploading video:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = async (title: string, file: File, description: string) => {
    const url = await handleVideoUpload(file)
    if (url) {
      setVideos([...videos, { title, file, url, description }])
    } else {
      console.error('Failed to upload video')
    }
  }

  const handleDeleteVideo = async (videoUrl: string) => {
    try {
      await deleteVideoApi({ videoUrl })
      setVideos(videos.filter((video) => video.url !== videoUrl))
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const handleCreateChapter = async (chapterData: { title: string; videos: IVideo[] }) => {
    try {
      const response = await createChapterApi({ courseId, chapterData })
      return response.data.course
    } catch (error) {
      console.error('Error creating chapter:', error)
    }
  }

  const onAddVideo = async () => {
    const { videoTitle, videoFile, description } = form.getValues()
    if (videoTitle && videoFile && videoFile.length > 0) {
      await handleAddVideo(videoTitle, videoFile[0], description)
      form.resetField('videoTitle')
      form.resetField('videoFile')
      form.resetField('description')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      toast.error('Tiêu đề , hoặc video đang trống', { ...toastConfig })
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { chapterTitle } = data
    if (chapterTitle && videos?.length > 0) {
      const chapterData = { title: chapterTitle, videos }
      await handleCreateChapter(chapterData).then(() => {
        setVideos([])
        form.reset()
        toast.success('Tạo chương mới thành công', { ...toastConfig })
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='chapterTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chapter Title</FormLabel>
              <FormControl>
                <Input placeholder='Chapter Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {videos.map((video, index) => (
          <div key={index} className='flex items-center space-x-4 justify-between'>
            <span className='flex items-center h-9 w-full rounded-md font-bold border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'>
              {video.title}
            </span>
            <Button type='button' onClick={() => handleDeleteVideo(video.url as string)} variant='secondary' size='sm'>
              Xóa
            </Button>
          </div>
        ))}
        <div className='flex items-center space-x-4 w-full'>
          <FormField
            control={form.control}
            name='videoTitle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <Input placeholder='Video Title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='videoFile'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video File</FormLabel>
                <FormControl>
                  <input
                    ref={fileInputRef}
                    className='w-full'
                    type='file'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='mt-8' type='button' onClick={onAddVideo}>
            {loading ? 'Uploading...' : 'Add Video'}
          </Button>
        </div>
        <Button type='submit' disabled={loading}>
          {loading ? 'Uploading...' : 'Add Chapter'}
        </Button>
      </form>
    </Form>
  )
}
