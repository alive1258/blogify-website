import axios from 'axios'
import { useEffect } from 'react'

import { api } from '../allApi'
import { useAuth } from './useAuth'

const useAxios = () => {
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    // Interceptor for modifying outgoing requests
    const requestIntercept = api.interceptors.request.use(
      config => {
        const accessToken = auth?.accessToken
        if (accessToken) {
          // Adding authorization header with access token to the request config
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Interceptor for handling failed responses, especially unauthorized (401)
    const responseIntercept = api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        // If the error is due to unauthorized access and not already retried
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = auth?.refreshToken
            // Requesting a new access token using the refresh token
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            )
            const { token } = response.data
            console.log(`New Token: ${token}`)
            // Updating the access token in the authentication state
            setAuth({ ...auth, accessToken: token })

            originalRequest.headers.Authorization = `Bearer ${token}`
            // Re-sending the original request with the updated token
            return axios(originalRequest)
          } catch (error) {
            console.log(error)
            throw error
          }
        }
        return Promise.reject(error)
      }
    )
    // Cleanup function to remove interceptors when component unmounts
    return () => {
      api.interceptors.request.eject(requestIntercept)
      api.interceptors.response.eject(responseIntercept)
    }
  }, [auth.accessToken]) // Dependency array to run effect when access token changes
  // Returning the configured axios instance
  return { api }
}

export default useAxios
