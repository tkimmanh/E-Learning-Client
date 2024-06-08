// ** Router
import { Route, Routes } from 'react-router-dom'

// ** layout
import RootLayout from './page/layout'
import AuthLayout from './page/(auth)/layout'
import DashboardLayout from './page/(dashboard)/layout'

// ** config
import { courseRoute } from './router/course.route'
import { authRoute } from './router/auth.route'
import { dashboardRoute } from './router/dashboard.route'

// ** pages
import RegisterPage from './page/(auth)/register'
import LoginPage from './page/(auth)/login'
import ForgotPasswordPage from './page/(auth)/reset-password'
import BecomeInstructorPage from './page/(instructor)/become-instrucror'
import DashboardPage from './page/(dashboard)/dashboard'
import ListCoursePage from './page/(course)/list-courses'

// ** components
import PrivateRoute from './components/common/private-router'

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={courseRoute.listCourse.path} element={<ListCoursePage />} />
          <Route path={courseRoute.becomeInstructor.path} element={<BecomeInstructorPage />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <AuthLayout />
            </PrivateRoute>
          }
        >
          <Route path={authRoute.register.path} element={<RegisterPage />} />
          <Route path={authRoute.login.path} element={<LoginPage />} />
          <Route path={authRoute.resetPassword.path} element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path={dashboardRoute.dashboard.path} element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
