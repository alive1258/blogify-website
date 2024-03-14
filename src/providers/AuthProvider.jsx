import { useState } from 'react'
import { AuthContext } from '../context'

const AuthProvider = ({ children }) => {
  // State to manage authentication data
  const [auth, setAuth] = useState({})

  // Render the AuthContext.Provider with auth state and setAuth function as value
  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
