import { useEffect, useRef, useState } from 'react'
import { actions } from '../../actions' // Import actions if not already imported
import donePic from '../../assets/done.png'
import { usePost } from '../../hooks/usePost'
import AllBlogs from './AllBlogs'
import FavoriteBlogs from './FavoriteBlogs'
import PopularBlogs from './PopularBlogs'
// Home component to display all blogs, popular blogs, and favorite blogs
const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const blogsPerPage = 10 // Maximum number of blogs per page
  const { dispatch } = usePost() // Assuming usePost hook provides dispatch function

  useEffect(() => {
    // Function to fetch blogs from the server
    dispatch({ type: actions.post.DATA_FETCHING })

    const fetchBlogs = async () => {
      setLoading(true) // Set loading to true when fetching data
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs?page=${page}&limit=${blogsPerPage}`
        )
        const data = await response.json()
        if (data.blogs.length === 0) {
          setHasMore(false) // If no more blogs are returned, set hasMore to false
        } else {
          // Append fetched blogs to the existing list
          setBlogs(prevBlogs => [...prevBlogs, ...data.blogs])

          // Increment page number for the next fetch
          setPage(prevPage => prevPage + 1)
        }
        dispatch({ type: actions.post.DATA_FETCHED, data }) // Dispatch action with fetched data
      } catch (error) {
        console.error(error)
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        })
      } finally {
        setLoading(false) // Set loading to false when data fetching is completed
      }
    }

    // Function to handle intersection observer callback
    const onIntersection = items => {
      const loaderItem = items[0]
      if (loaderItem.isIntersecting && hasMore && !loading) {
        // Check if not loading before fetching more data
        fetchBlogs()
      }
    }

    // Create an intersection observer
    const observer = new IntersectionObserver(onIntersection)

    // Observe the loader element
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    // Cleanup function to disconnect the observer when the component is unmounted
    return () => {
      if (observer) observer.disconnect()
    }
  }, [dispatch, hasMore, page, loading])

  // Function to handle deletion of a post
  const handleDeletePost = deletedPostId => {
    // Filter out the deleted post from the list of blogs
    const updatedBlogs = blogs.filter(blog => blog.id !== deletedPostId)
    setBlogs(updatedBlogs)
  }

  // Function to handle update of a blog post
  const updateBlog = updatedBlog => {
    const index = blogs.findIndex(blog => blog.id === updatedBlog.id)

    // Update the blog post at the found index with the updated data
    if (index !== -1) {
      const updatedBlogs = [...blogs]

      // Update the blog post at the found index with the updated data
      updatedBlogs[index] = updatedBlog

      // Update the state with the updated 'blogs' array
      setBlogs(updatedBlogs)
    }
  }

  return (
    <>
      <main className="pt-32">
        {/* <!-- Begin Blogs --> */}
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {/* <!-- Blog Contents --> */}
              <AllBlogs
                blogs={blogs}
                onDelete={handleDeletePost}
                onUpdateBlog={updateBlog}
              />

              {/* <!-- Sidebar --> */}
              <div className="md:col-span-2 h-full w-full space-y-5">
                {/* Most Popular blogs */}
                <PopularBlogs />
                {/* favorite blogs */}
                <FavoriteBlogs />
              </div>
              {hasMore && (
                <div ref={loaderRef}>
                  <button type="button" className="bg-indigo-500 " disabled>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 "
                      viewBox="0 0 24 24"
                    ></svg>
                    Loading...
                  </button>
                </div>
              )}
              {!hasMore && (
                <div className="pt-8">
                  <p className="text-[#00b4d8]  font-semibold text-2xl">
                    All Blogs Loaded
                  </p>
                  <img className="py-3" src={donePic} alt="" />
                </div>
              )}
            </div>
          </div>
        </section>
        {/* <!-- End Blogs --> */}
      </main>
    </>
  )
}

export default Home
