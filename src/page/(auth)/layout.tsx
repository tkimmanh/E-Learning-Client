// ** component
import Header from '@/components/common/header'

// ** Outlet
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className='grid grid-cols-12 h-screen'>
        <div className='col-span-6 border-r-[0.5px] border-gray-800'>
          <img
            className='h-[730px] object-cover'
            src='https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
        </div>
        <div className='col-span-6'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
