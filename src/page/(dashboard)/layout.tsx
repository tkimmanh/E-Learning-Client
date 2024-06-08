// ** components
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

// ** config
import Header from '@/components/common/header'
import { dashboardRoute } from '@/router/dashboard.route'

// ** react-router
import { NavLink, Outlet } from 'react-router-dom'

type Route = {
  id: string
  name: string
  path: string
}

const DashboardLayout = () => {
  const routes: Route[] = Object.values(dashboardRoute)
  return (
    <>
      <Header />
      <div className='grid grid-cols-12 gap-x-5 w-full'>
        <div className='col-span-2'>
          <div className=' border-r-[0.5px] border-gray-800 h-screen'>
            <div className='flex flex-col gap-4 items-center gap-y-5'>
              {routes.map((route) => (
                <NavLink
                  className={({ isActive }) => (isActive ? 'text-white font-bold mt-5 ' : 'text-[#a1a1aa]  ')}
                  key={route.id}
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-6 w-full'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
