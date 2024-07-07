// react
import { useState, useEffect } from 'react'

// react router
import { useParams } from 'react-router-dom'

// api
import { updateCourseApi, deleteImageCourseApi, uploadImageCourseApi } from '@/apis/course.api'

//type
import { ICourse } from '@/types/couser'

//hooks
import { useAppSelector } from '@/hooks/useAppSelector'

// redux
import { RootState } from '@/redux/store'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getDetailCourseThunk } from '@/redux/course/action'

// components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

// react hook form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/lib/zod/couser.schema'

// toast
import { toast } from 'react-toastify'

// config
import { toastConfig } from '@/config/toast.config'
import { useDropzone } from 'react-dropzone'

const EditCoursePage = () => {
  const { courseId } = useParams()
  const { course, loadingCourse } = useAppSelector((state: RootState) => state.course)
  const dispatch = useAppDispatch()
  const [imagePreview, setImagePreview] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  const form = useForm<ICourse>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      price: 0,
      paid: 'false',
      discount: 0,
      published: false
    }
  })

  useEffect(() => {
    async function fetchCourse() {
      try {
        await dispatch(getDetailCourseThunk(courseId as string))
      } catch (error) {
        console.error('Error fetching course:', error)
      }
    }
    fetchCourse()
  }, [dispatch, courseId])

  useEffect(() => {
    if (course) {
      form.reset(course)
      setImagePreview(course.image as string)
      setImageUrl(course.image as string)
    }
  }, [course, form])

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    try {
      const response = await uploadImageCourseApi(formData)
      return response.data.result
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      const imageUrl = await handleImageUpload(file)
      if (imageUrl) {
        setImageUrl(imageUrl)
        form.setValue('image', imageUrl)
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accept: 'image/*' as any
  })

  const handleImageDelete = async () => {
    try {
      await deleteImageCourseApi({ imageUrl })
      setImagePreview('')
      setImageUrl('')
      form.setValue('image', '')
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleUpdateCourse = async (updatedCourse: ICourse) => {
    try {
      await updateCourseApi(courseId as string, updatedCourse)
      toast.success('Cập nhật khóa học thành công', { ...toastConfig })
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  const paid = form.watch('paid')

  if (loadingCourse) return <div>Loading...</div>

  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-4'>Edit Course</h1>
      {course && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => handleUpdateCourse(values))} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Course Name' {...field} />
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
                    <Textarea placeholder='Description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='paid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      if (value === 'false') {
                        form.setValue('price', 0)
                      }
                    }}
                    defaultValue={field.value.toString() as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select payment status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='true'>Mất phí</SelectItem>
                      <SelectItem value='false'>Miễn phí</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {paid === 'true' && (
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder='Price' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className='flex flex-col'>
              <FormField
                control={form.control}
                name='image'
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div
                        {...getRootProps()}
                        className='border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer'
                      >
                        <input disabled={imagePreview ? false : true} {...getInputProps()} />
                        <p className='text-[#a1a1aa]'>Chọn ảnh</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className='relative'>
                  <img src={imagePreview} alt='Image Preview' className='w-28 h-32 object-cover my-4' />
                  <button
                    type='button'
                    onClick={handleImageDelete}
                    className='absolute top-[49%] left-[2.8%] bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name='discount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder='Discount' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='published'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>{loadingCourse ? '...' : 'Update Course'}</Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default EditCoursePage
