import { getPurchasedCourseByIdApi } from '@/apis/course.api'
import { CourseState } from '@/types/couser'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

const PlayList = () => {
  const { courseId } = useParams()
  const [purchasedCourse, setPurchasedCourse] = useState<CourseState | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [title, setTitle] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPurchasedCourse() {
      try {
        const res = await getPurchasedCourseByIdApi(courseId as string)
        setPurchasedCourse(res.data.result)
      } catch (error) {
        navigate('/')
      }
    }
    fetchPurchasedCourse()
  }, [courseId, navigate])

  return (
    <div className='grid grid-cols-10 gap-x-20'>
      <div className='col-span-4 border-r-[0.5px] border-gray-800 h-screen'>
        <div className='px-2'>
          <h2 className='text-2xl font-bold mb-4 mt-4'>Danh sách</h2>
          <Accordion type='single' collapsible className='w-full'>
            {purchasedCourse?.chapters.map((chapter) => {
              return (
                <AccordionItem key={chapter._id} value={chapter._id}>
                  <AccordionTrigger>{chapter.title}</AccordionTrigger>
                  <AccordionContent>
                    {chapter.videos.map((video, videoIndex) => (
                      <div key={videoIndex}>
                        <button
                          className='mb-4 flex gap-x-2 items-center'
                          onClick={() => {
                            setSelectedVideo(video.url)
                            setTitle(video.title)
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z'
                            />
                          </svg>
                          {video.title}
                        </button>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
      <div className='col-span-6 w-full mt-4'>
        {title && <h2 className='text-2xl font-bold mb-2'>{title}</h2>}
        {selectedVideo && (
          <div>
            <ReactPlayer url={selectedVideo} width='100%' height='100%' controls />
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayList
