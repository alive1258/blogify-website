import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Logout component for user logout functionality
const Logout = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  // Function to handle user logout
  const handleLogout = () => {
    setAuth({}) // Clear authentication state
    navigate('/login') // Redirect to login page after logout
  }

  return (
    <button className="icon-btn" onClick={handleLogout}>
      LogOut
    </button>
  )
}

export default Logout
