import { useRef } from 'react'
import { actions } from '../../actions'
import editIcon from '../../assets/icons/edit.svg'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import { useProfile } from '../../hooks/useProfile'

const ProfileImage = () => {
  const { auth } = useAuth()
  const { state, dispatch } = useProfile()
  const { api } = useAxios()
  const fileUploaderRef = useRef()

  // Check if the profile belongs to the authenticated user
  const isMyProfile = auth?.user?.id === state?.user?.id

  // Determine user and avatar information
  const user = state?.user ?? auth?.user

  let pic
  let firstNameInitial
  // Set the avatar image or initials if no avatar is available
  if (user?.avatar != null) {
    pic = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
      user?.avatar
    }`
  } else {
    firstNameInitial = auth?.user?.firstName
      ? auth.user.firstName.charAt(0)
      : ''
  }

  // Function to handle image upload
  const handleImageUpload = event => {
    event.preventDefault()
    // Trigger file input click event
    fileUploaderRef.current.addEventListener('change', updateImageDisplay)
    fileUploaderRef.current.click()
  }

  // Function to update image display after upload
  const updateImageDisplay = async () => {
    try {
      // Create form data with selected files
      const formData = new FormData()
      for (const file of fileUploaderRef.current.files) {
        formData.append('avatar', file)
      }
      // Send form data to update profile avatar
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      )
      if (response.status === 200) {
        // Dispatch action to update user data
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user,
        })
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      })
    }
  }

  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          {user.avatar != null ? (
            <div>
              <img
                className="max-w-full h-[120px] w-[120px] rounded-full"
                src={pic}
                alt=""
              />
            </div>
          ) : (
            <div className="avater-img bg-orange-600 text-white">
              <span className="text-xl">{firstNameInitial}</span>
            </div>
          )}
        </div>
        <form id="form" encType="multipart/form-data">
          {isMyProfile && (
            <button
              onClick={handleImageUpload}
              className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            >
              <img src={editIcon} alt="Edit" />
            </button>
          )}

          <input id="file" type="file" ref={fileUploaderRef} hidden />
        </form>
      </div>
    </>
  )
}

export default ProfileImage
