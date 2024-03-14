import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ProfileProvider from '../providers/ProfileProvider'

// Define the PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  // Retrieve authentication status and loading state from useAuth hook
  const { auth, loading } = useAuth()

  // Get the current location using useLocation hook
  const location = useLocation()

  // If authentication status is still loading, display a loading message
  if (loading) {
    return <p>Loading...</p>
  }

  // If user is authenticated (access token exists), render children wrapped with ProfileProvider
  if (auth?.accessToken) {
    return <ProfileProvider>{children}</ProfileProvider>
  }

  // If user is not authenticated, redirect to the login page
  // with information about the current location to enable redirection after login
  return <Navigate state={{ from: location }} to="/login" replace />
}

export default PrivateRoute
