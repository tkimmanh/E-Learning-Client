// ** Component
import Header from '@/components/common/header'

// ** React router
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <Header></Header>
      <main className='h-screen mx-9'>
        <Outlet />
      </main>
    </div>
  )
}
