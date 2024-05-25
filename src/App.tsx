// ** Router
import { Route, Routes } from 'react-router-dom'

// ** layout
import RootLayout from './page/layout'
import AuthLayout from './page/(auth)/layout'

// ** pages
import ListCourse from './page/(course)/list-courses'

// ** config
import { courseRoute } from './router/course.route'
import { authRoute } from './router/auh.route'

// ** pages
import RegisterPage from './page/(auth)/register'

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={courseRoute.listCourse.path} element={<ListCourse />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={authRoute.register.path} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
