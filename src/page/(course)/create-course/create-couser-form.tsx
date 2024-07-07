/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'

// ** components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

// ** zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// ** schema
import { formSchema } from '@/lib/zod/couser.schema'
// ** api
import { createCourseApi, deleteImageCourseApi, uploadImageCourseApi } from '@/apis/course.api'
// ** type
import { ICourse } from '@/types/couser'
// ** toast
import { toast } from 'react-toastify'
// ** config
import { toastConfig } from '@/config/toast.config'
// ** react dropzone
import { useDropzone } from 'react-dropzone'

interface CreateCourseFormProps {
  onCourseCreated: (course: { _id: string }) => void
}

export const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ onCourseCreated }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [, setIsPaid] = useState<boolean>(true)

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
      // Preview image
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      // Upload image
      const imageUrl = await handleImageUpload(file)
      setImageUrl(imageUrl)
      form.setValue('image', imageUrl)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*' as any
  })
  // xóa ảnh
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

  async function onSubmit(values: ICourse) {
    setLoading(true)
    await createCourseApi(values)
      .then((response) => {
        onCourseCreated(response.data.course)
        toast.success('Thêm khóa học thành công!', { ...toastConfig })
      })
      .catch((error) => {
        console.error('Error creating course:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const paid = form.watch('paid')

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học</FormLabel>
                <FormControl>
                  <Input placeholder='Tên khóa học' {...field} />
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
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder='Mô tả khóa học' {...field} />
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
                <FormLabel>Tình trạng</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setIsPaid(value === 'true')
                    if (value === 'false') {
                      form.setValue('price', 0)
                    }
                  }}
                  defaultValue={field.value.toString() as string}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn tình trạng khóa học' />
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
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input placeholder='Giá khóa học' {...field} />
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
                  <FormLabel>Thubmail</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps({
                        className: 'border border-gray-800 cursor-pointer p-2 rounded border-dashed'
                      })}
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
                <FormLabel>Ưu đãi</FormLabel>
                <FormControl>
                  <Input placeholder='Ưu đãi' {...field} />
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
                <FormLabel>Xuất bản</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>{loading ? '...' : 'Lưu & tiếp tục'}</Button>
        </form>
      </Form>
    </>
  )
}
