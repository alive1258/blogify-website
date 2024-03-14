import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import MainLayout from './layout/MainLayout'
import PostProvider from './providers/PostProvider'
import ProfileProvider from './providers/ProfileProvider'

function App() {
  return (
    <>
      <div>
        <PostProvider>
          <ProfileProvider>
            <MainLayout />
            <ToastContainer />
          </ProfileProvider>
        </PostProvider>
      </div>
    </>
  )
}

export default App
