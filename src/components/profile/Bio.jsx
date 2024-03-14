import { useState } from 'react'
import { actions } from '../../actions'
import editIcon from '../../assets/icons/edit.svg'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import useAxios from './../../hooks/useAxios'

const Bio = () => {
  const { state, dispatch } = useProfile()
  const { api } = useAxios()
  const { auth } = useAuth()

  // Check if the profile belongs to the authenticated user
  const isMyProfile = auth?.user?.id === state?.user?.id

  const [bio, setBio] = useState(state?.user?.bio)
  const [editMode, setEditMode] = useState(false)

  // Function to handle bio editing
  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING })

    try {
      // Send updated bio to the server
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      )

      if (response.status === 200) {
        // Update profile data and exit edit mode
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data.user,
        })
        setEditMode(false)
      } else {
        throw new Error('Failed to update bio')
      }
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      })
    }
  }

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="text-black p-4"
            value={bio}
            rows={8}
            cols={75}
            onChange={e => setBio(e.target.value)}
          />
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          {isMyProfile && <img src={editIcon} alt="Edit" />}
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          Update
        </button>
      )}
    </div>
  )
}

export default Bio
