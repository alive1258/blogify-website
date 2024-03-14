import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import search from '../../assets/icons/search.svg'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import Logout from '../auth/LogoutForm'
import ModalContent from '../modal/ModalContent'
import Portal from './Portal'

const Navbar = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { state } = useProfile()
  const [showModal, setShowModal] = useState(false)
  const user = state?.user ?? auth?.user

  let pic
  let firstNameInitial

  if (user?.avatar != null) {
    pic = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
      user?.avatar
    }`
  } else {
    firstNameInitial = auth?.user?.firstName
      ? auth.user.firstName.charAt(0)
      : ''
  }

  const toggleAction = () => {
    setShowModal(!showModal)
  }

  const handleProfileClick = () => {
    if (auth.user) return
    const isConfirmed = window.confirm(
      `To view the Profile, you have to log in first`
    )

    if (!auth.user && isConfirmed) {
      // Redirect to the login page only if user confirms and is not logged in
      navigate('/login')
    } else if (!isConfirmed) {
      // Close the toast notification if the user cancels
      toast.dismiss()
      navigate('/')
    }
  }

  return (
    <>
      <header className="bg-[#030317] fixed w-full z-50 border-b border-gray-800">
        <nav className="container ">
          {/* <!-- Logo --> */}
          <div>
            <Link to="/">
              <img className="w-32" src={logo} alt="lws" />
            </Link>
          </div>

          {/* <!-- Actions - Login, Write, Home, Search -->
                <!-- Notes for Developers -->
                <!-- For Logged in User - Write, Profile, Logout Menu -->
                <!-- For Not Logged in User - Login Menu --> */}
          <div>
            <ul className="flex items-center space-x-5">
              <li onClick={handleProfileClick}>
                <Link
                  to="/write-blog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
              <li>
                {auth?.user && (
                  <div>
                    <button
                      onClick={toggleAction}
                      // href="./search.html"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <img src={search} alt="Search" />
                      <span>Search</span>
                    </button>

                    {showModal && (
                      <Portal>
                        <ModalContent onClose={() => setShowModal(false)} />
                      </Portal>
                    )}
                  </div>
                )}
              </li>
              <li>
                {auth?.user ? (
                  <Logout />
                ) : (
                  <button>
                    <Link
                      to="/login"
                      className="text-white/50 hover:text-white transition-all duration-200"
                    >
                      Login
                    </Link>
                  </button>
                )}
              </li>

              <li>
                {auth?.user && (
                  <>
                    <Link
                      to={`/profile/${auth?.user?.id}`}
                      className="flex items-center"
                    >
                      {user.avatar != null ? (
                        <div className="avater-img ">
                          <img
                            className="avater-img rounded-full"
                            src={pic}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="avater-img bg-orange-600 text-white">
                          <span>{firstNameInitial}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-white ml-2">
                          {auth?.user?.firstName} {auth?.user?.lastName}
                        </span>
                      </div>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
