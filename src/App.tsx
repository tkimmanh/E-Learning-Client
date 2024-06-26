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
import { commonRoutes } from './router/common.route'

// ** pages
import RegisterPage from './page/(auth)/register'
import LoginPage from './page/(auth)/login'
import ForgotPasswordPage from './page/(auth)/reset-password'

import DashboardPage from './page/(dashboard)/dashboard'
import ListCoursePage from './page/(course)/list-courses'
import DetailCoursePage from './page/(course)/course-detail'
import CreateCoursePage from './page/(course)/create-course'
import PaymentSuccessPage from './page/(payment)/payment-success'
import PaymentErrorPage from './page/(payment)/payment-error'
import MyCoursePage from './page/(course)/my-course'
import PlayList from './page/(course)/play-list'

// ** components
import GuardedRoute from './components/common/protected-router'
import { ProtectedRoute, RejectedRoute } from './components/common/private-router'

// ** config
import { INSTRUCTOR_ROLE } from './config/role.config'

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={courseRoute.listCourse.path} element={<ListCoursePage />} />
          <Route path={courseRoute.detailCourse.path} element={<DetailCoursePage />} />
        </Route>

        <Route
          element={
            <RejectedRoute>
              <RootLayout />
            </RejectedRoute>
          }
        >
          <Route path={courseRoute.myCourse.path} element={<MyCoursePage />} />
          <Route path={courseRoute.coursePlay.path} element={<PlayList />} />
          <Route path={commonRoutes.paymentSuccess.path} element={<PaymentSuccessPage />} />
          <Route path={commonRoutes.paymentError.path} element={<PaymentErrorPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path={authRoute.register.path} element={<RegisterPage />} />
          <Route path={authRoute.login.path} element={<LoginPage />} />
          <Route path={authRoute.resetPassword.path} element={<ForgotPasswordPage />} />
        </Route>

        <Route
          element={
            <GuardedRoute requiredRole={INSTRUCTOR_ROLE}>
              <DashboardLayout />
            </GuardedRoute>
          }
        >
          <Route path={dashboardRoute.dashboard.path} element={<DashboardPage />} />
          <Route path={dashboardRoute.createCourse.path} element={<CreateCoursePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
