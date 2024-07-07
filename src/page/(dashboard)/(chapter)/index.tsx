import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateChapterApi, deleteVideoApi, uploadVideoApi } from '@/apis/course.api'
import { IChapter, IVideo } from '@/types/couser'
import { formSchema } from '@/lib/zod/chapter.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { toastConfig } from '@/config/toast.config'
import { z } from 'zod'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { RootState } from '@/redux/store'
import { getDetailCourseThunk } from '@/redux/course/action'

const EditChapterPage = () => {
  const { courseId, chapterId } = useParams()

  const [loading, setLoading] = useState<boolean>(false)
  const [videos, setVideos] = useState<IVideo[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { course } = useAppSelector((state: RootState) => state.course)
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterTitle: '',
      videoTitle: '',
      videoFile: null,
      description: ''
    }
  })

  useEffect(() => {
    async function fetchCourse() {
      try {
        await dispatch(getDetailCourseThunk(courseId as string))
        const chapter = course?.chapters.find((ch: IChapter) => ch._id === chapterId)
        if (chapter) {
          form.reset({ chapterTitle: chapter.title })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setVideos(chapter.videos as any)
        }
      } catch (error) {
        console.error('Error fetching course:', error)
      }
    }
    fetchCourse()
  }, [courseId, dispatch])

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

  const handleUpdateChapter = async (data: z.infer<typeof formSchema>) => {
    const { chapterTitle } = data
    if (chapterTitle && videos.length > 0) {
      const chapterData = { title: chapterTitle, videos }
      try {
        await updateChapterApi(courseId as string, chapterId as string, chapterData)
        toast.success('Cập nhật chương thành công', { ...toastConfig })
      } catch (error) {
        console.error('Error updating chapter:', error)
      }
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
      toast.error('Tiêu đề hoặc video đang trống', { ...toastConfig })
    }
  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-4'>Edit Chapter</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateChapter)} className='space-y-8'>
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
              <Button
                type='button'
                onClick={() => handleDeleteVideo(video.url as string)}
                variant='secondary'
                size='sm'
              >
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
            {loading ? 'Uploading...' : 'Update Chapter'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EditChapterPage
