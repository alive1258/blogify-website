import { useContext, useDebugValue, useEffect, useState } from 'react'
import { AuthContext } from '../context'

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const [initialized, setInitialized] = useState(false)

  // Effect to check for authentication data in local storage on component mount
  useEffect(() => {
    // Retrieve token and user data from local storage
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    // If token and user data are present, set authentication context
    if (token && user) {
      setAuth({ accessToken: token, user })
    }
    setInitialized(true)
  }, [])

  // The useDebugValue hook should not cause re-renders, so it doesn't need to depend on any value
  useDebugValue(auth ? 'User logged In' : 'User logged Out')

  return { auth, initialized, setAuth }
}
