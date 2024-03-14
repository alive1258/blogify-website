import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import BlogBegin from './BlogBegin'
import CommentInput from './CommentInput'
import FloatingAction from './FloatingAction'

const BlogDetails = () => {
  const { id } = useParams() // Get the blog ID from the URL
  const [blog, setBlog] = useState(null)
  const [likeCount, setLikeCount] = useState(0)
  const { api } = useAxios()

  // Function to fetch blog details from the server.
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`
        )
        if (response.status === 200) {
          setBlog(response?.data)
          setLikeCount(response?.data?.likes?.length)
        } else {
          throw new Error('Failed to fetch blog')
        }
      } catch (error) {
        console.error('Error fetching blog:', error.message)
      }
    }

    fetchBlog()
  }, [api, id])

  // Function to handle addition of a new comment.
  const handleCommentAdded = newComment => {
    // Update the blog state with the new comment
    setBlog(prevBlog => ({
      ...prevBlog,
      comments: [...prevBlog.comments, newComment],
    }))
  }

  // Function to update the like count.
  const updateLikeCount = newLikeCount => {
    setLikeCount(newLikeCount) // Update like count
  }

  if (!blog) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="pt-28">
        <main>
          {/* <!-- Begin Blogs --> */}
          <section>
            <BlogBegin blog={blog} likeCount={likeCount} />
          </section>
          {/* <!-- End Blogs --> */}

          {/* <!-- Begin Comments --> */}
          <section id="comments">
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-3xl font-bold my-8">
                Comments {blog?.comments?.length}
              </h2>
              <CommentInput blog={blog} onCommentAdded={handleCommentAdded} />
            </div>
          </section>
        </main>
        {/* <!-- End main --> */}

        {/* <!-- Floating Actions--> */}
        <div className="floating-action">
          <FloatingAction blog={blog} onLikeAdded={updateLikeCount} />
        </div>
      </div>
    </>
  )
}

export default BlogDetails
