export const courseRoute = {
  listCourse: {
    id: '1',
    path: '/'
  },
  detailCourse: {
    id: '2',
    path: '/course/:courseId'
  },
  createCourse: {
    id: '3',
    path: '/create'
  },
  becomeInstructor: {
    id: '4',
    path: '/become-instructor'
  },
  cart: {
    id: '5',
    path: '/course/cart'
  },
  coursePlay: {
    id: '6',
    path: '/course/play/:courseId'
  },
  chapter: {
    id: '7',
    path: '/course/:courseId/chapter'
  },
  chapterEdit: {
    id: '9',
    path: '/course/:courseId/chapter/:chapterId'
  },
  myCourse: {
    id: '8',
    path: '/my-course'
  },
  editCourse: {
    id: '8',
    path: '/course/edit/:courseId'
  }
}
