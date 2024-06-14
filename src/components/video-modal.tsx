import Modal from 'react-modal'
import ReactPlayer from 'react-player'

const VideoModal = ({
  isOpen,
  onRequestClose,
  videoUrl
}: {
  isOpen: boolean
  onRequestClose: () => void
  videoUrl: string
}) => (
  <Modal
    overlayClassName={
      'fixed inset-0 bg-black bg-opacity-40 z-50 w-full flex justify-center items-center transition-opacity duration-500'
    }
    className='relative outline-none w-full'
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel='Video modal'
    shouldCloseOnOverlayClick={true}
  >
    <div className='flex items-center justify-center w-full'>
      <ReactPlayer url={videoUrl} width='60%' height='60%' controls />
    </div>
  </Modal>
)

export default VideoModal
