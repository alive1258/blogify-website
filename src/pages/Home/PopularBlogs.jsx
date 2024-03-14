import { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import SingleBlog from './SingleBlog'

const PopularBlogs = () => {
  const { api } = useAxios() // Get the api object from useAxios
  const [popularBlogs, setPopularBlogs] = useState([]) // State to store the fetched blogs

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        )
        if (response.status === 200) {
          // Set the fetched blogs in the state
          setPopularBlogs(response.data.blogs)
        } else {
          throw new Error('Unexpected response status')
        }
      } catch (error) {
        console.error('Error fetching popular blogs:', error.message)
      }
    }

    fetchPost()
  }, [api])

  return (
    <>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Most Popular 👍️
        </h3>

        <ul className="space-y-5 my-5">
          {popularBlogs?.map(blog => (
            <SingleBlog blog={blog} key={blog?.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default PopularBlogs
