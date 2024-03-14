import { useEffect, useState } from 'react'
import noFavPic from '../../assets/noFav.png'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import MyFavoriteBlog from './MyFavoriteBlog'
// Component for displaying favorite blogs
const FavoriteBlogs = () => {
  const { api } = useAxios() // Get the api object from useAxios
  const [favoriteBlogs, setFavoriteBlogs] = useState([]) // State to store the fetched blogs
  const { auth } = useAuth()
  // Check if the user has any favorite blogs
  // const isMyFavoriteBlog = auth?.user?.id

  useEffect(() => {
    // Function to fetch favorite blogs from the server
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        )
        if (response.status === 200) {
          // Set the fetched blogs in the state
          setFavoriteBlogs(response.data.blogs)
        } else {
          throw new Error('Unexpected response status')
        }
      } catch (error) {
        console.error('Error fetching popular blogs:', error.message)
      }
    }

    fetchPost() // Invoke the fetchPost function when the component mounts
  }, [api]) // Dependency array to ensure this effect runs only once when the component mounts
  return (
    <>
      {auth?.user && (
        <div className="sidebar-card">
          <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            Your Favourites ❤️
          </h3>

          {favoriteBlogs?.length > 0 ? (
            <ul className="space-y-5 my-5">
              {favoriteBlogs?.map(blog => (
                <MyFavoriteBlog blog={blog} key={blog.id} />
              ))}
            </ul>
          ) : (
            <div className="">
              <p className="pt-4  text-xl font-bold">
                You Have No Favorite Blogs Right Now....
              </p>
              <div className="flex justify-center items-center">
                <img className="w-14 pt-2 " src={noFavPic} alt="" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default FavoriteBlogs
