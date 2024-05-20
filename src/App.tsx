// ** Router
import { Route, Routes } from 'react-router-dom'

// ** layout
import RootLayout from './page/layout'

// ** pages
import ListCourse from './page/(course)/list-courses'
import { courseRoute } from './router/course.route'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={courseRoute.listCourse.path} element={<ListCourse />} />
      </Route>
    </Routes>
  )
}

export default App
