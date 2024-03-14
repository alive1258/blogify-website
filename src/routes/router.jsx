import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import BlogDetails from '../components/blog/BlogDetails'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import WriteBlog from '../pages/WriteBlog/WriteBlog'
import Register from './../pages/Register/Register'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'write-blog',
        element: (
          <PrivateRoute>
            {' '}
            <WriteBlog />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile/:userId',
        element: (
          <PrivateRoute>
            {' '}
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'blogs/:id',
        element: <BlogDetails />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

export default router
