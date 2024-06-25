import { getPurchasedCourseByIdApi } from '@/apis/course.api'
import { CourseState, IChapter } from '@/types/couser'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoModal from '@/components/video-modal'

const PlayList = () => {
  const { courseId } = useParams()
  const [purchasedCourse, setPurchasedCourse] = useState<CourseState | null>(null)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPurchasedCourse() {
      try {
        const res = await getPurchasedCourseByIdApi(courseId as string)
        setPurchasedCourse(res.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPurchasedCourse()
  }, [courseId])

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideoUrl(null)
  }

  return (
    <div className='flex'>
      <div className='w-1/4 p-4'>
        <h2 className='text-2xl font-bold mb-4'>Danh sách</h2>
        {purchasedCourse?.chapters.map((chapter: IChapter, index) => (
          <div key={index} className='mb-4'>
            <h3 className='text-xl font-semibold'>{chapter.title}</h3>
            <ul className='list-disc list-inside'>
              {chapter.videos.map((video, videoIndex) => (
                <li
                  key={videoIndex}
                  className='cursor-pointer text-blue-500'
                  onClick={() => handleVideoClick(video.url)}
                >
                  {video.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='w-3/4 p-4'>
        <h2 className='text-2xl font-bold mb-4'>Phát video</h2>
      </div>
    </div>
  )
}

export default PlayList
