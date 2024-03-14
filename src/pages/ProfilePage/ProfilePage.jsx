import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions } from '../../actions'
import MyBlogs from '../../components/profile/MyBlogs'
import MyProfile from '../../components/profile/MyProfile'
import useAxios from '../../hooks/useAxios'
import { useProfile } from '../../hooks/useProfile'

const ProfilePage = () => {
  const { userId } = useParams()
  const { state, dispatch } = useProfile()
  const { api } = useAxios()

  // Fetch user profile data when the userId changes or on component mount
  useEffect(() => {
    // Dispatch action to indicate data fetching
    dispatch({ type: actions.profile.DATA_FETCHING })

    // Function to fetch profile data
    const fetchProfile = async () => {
      try {
        // Fetch profile data from the server
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
        )
        // If data is fetched successfully
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data })
        }
      } catch (error) {
        // Dispatch action to handle data fetch error
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        })
      }
    }
    // Call fetchProfile function
    fetchProfile()
  }, [api, userId, dispatch]) // Dependencies for useEffect

  // If data is still loading, display a loading message
  if (state?.loading) {
    return <div>Fetching data...</div>
  }

  return (
    <>
      <main className="mx-auto max-w-[1020px] py-8 pt-32">
        <div className="container">
          {/* <!-- profile info --> */}
          <MyProfile />
          {/* <!-- end profile info --> */}

          <MyBlogs />
        </div>
      </main>
    </>
  )
}

export default ProfilePage
