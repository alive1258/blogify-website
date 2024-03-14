import { useReducer } from 'react'
import { ProfileContext } from '../context'
import { initialState, profileReducer } from '../reducers/ProfileReducer'

const ProfileProvider = ({ children }) => {
  // Use useReducer hook to manage profile state and dispatch actions
  const [state, dispatch] = useReducer(profileReducer, initialState)

  // Render the ProfileContext.Provider with profile state and dispatch function as value
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
