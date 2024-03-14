import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import { useProfile } from '../../hooks/useProfile'
import BlogCommentsList from './BlogCommentsList'

const CommentInput = ({ blog, onCommentAdded }) => {
  const { state } = useProfile()
  const { auth } = useAuth()
  const [comments, setComments] = useState(blog?.comments)
  const [content, setContent] = useState('')
  const { api } = useAxios()

  const user = state?.user ?? auth?.user
  let pic
  let firstNameInitial

  if (user?.avatar != null) {
    pic = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
      user?.avatar
    }`
  } else {
    firstNameInitial = auth?.user?.firstName
      ? auth.user.firstName.charAt(0)
      : ''
  }

  // Function to add a comment to the blog.
  const addComment = async () => {
    try {
      if (!auth.user) {
        toast.error('To comment on this blog, you must first log in.', {
          position: toast.TOP_RIGHT,
        })
        return
      }
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/comment`,
        { content } // Changed from 'comment' to 'content'
      )
      if (response.status === 200) {
        // Update comments state with the newly added comment
        setComments([...response.data.comments])

        setContent('')
        // Show success toast notification
        if (auth.user) {
          toast.success('Comment added successfully', {
            position: toast.TOP_RIGHT,
          })
        } else {
          toast.info('Please log in to comment', {
            position: toast.TOP_RIGHT,
          })
        }
        onCommentAdded()

        // Scroll to the top of the comments container
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  return (
    <>
      <div className="flex items -center space-x-4">
        {auth?.user && (
          <div className="avater-img bg-indigo-600 text-white">
            {user.avatar != null ? (
              <div className="avater-img ">
                <img className="avater-img rounded-full" src={pic} alt="" />
              </div>
            ) : (
              <div className="avater-img bg-orange-600 text-white">
                <span>{firstNameInitial}</span>
              </div>
            )}
          </div>
        )}

        <div className="w-full">
          <textarea
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
            placeholder="Write a comment"
            name="post"
            id="post"
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                addComment()
              }
            }}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={addComment}
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-scroll mt-8">
        <BlogCommentsList
          comments={comments}
          setComments={setComments}
          blog={blog}
        />
      </div>
    </>
  )
}

export default CommentInput
