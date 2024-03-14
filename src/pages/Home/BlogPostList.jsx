import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { actions } from '../../actions'
import dots from '../../assets/icons/3dots.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'
import Portal from '../../components/common/Portal'
import { useAuth } from '../../hooks/useAuth'
import { useAvatar } from '../../hooks/useAvatar'
import useAxios from '../../hooks/useAxios'
import { usePost } from '../../hooks/usePost'
import { formatDate } from '../../utils'
import EditBlogModal from './EditBlogModal'

const BlogPostList = ({ blog, onDelete, onUpdateBlog }) => {
  const [showAction, setShowAction] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()
  const { dispatch } = usePost()
  const { api } = useAxios()
  const { avatarURL } = useAvatar(blog)
  const navigate = useNavigate()

  // Extracting author ID and checking if the blog belongs to the current user
  const authorId = blog?.author?.id
  const isMyBlog = authorId && auth?.user?.id === authorId

  // Toggle action menu visibility
  const toggleAction = () => {
    setShowAction(!showAction)
  }

  // Toggle modal visibility
  const modalAction = () => {
    setShowModal(!showModal)
  }

  // Handle post deletion
  const handleDeletePost = async event => {
    event.preventDefault()

    // Dispatch an action indicating that data fetching is in progress
    dispatch({ type: actions.post.DATA_FETCHING })

    // Ask for confirmation
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    )

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
        )

        // If deletion is successful
        if (response.status === 200) {
          // Dispatch an action to update the state with the deleted post
          dispatch({
            type: actions.post.POST_DELETED,
            data: blog.id,
          })
          // Show success toast notification
          toast.success(`Blog post "${blog?.title}" deleted successfully!`, {
            position: toast.TOP_RIGHT,
          })
          // Call the onDelete callback to notify the parent component
          onDelete(blog.id)
        }
      } catch (error) {
        console.error(error)
        // Dispatch an action to handle data fetch error
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        })
      }
    }
  }

  // Format the creation date of the blog post
  const formattedDate = formatDate(blog?.createdAt)

  // Handle profile click
  const handleProfileClick = () => {
    if (auth.user) return
    // Redirect to the login page only if user confirms and is not logged in
    const isConfirmed = window.confirm(
      `To view the Profile, you have to log in first`
    )

    if (!auth.user && isConfirmed) {
      // Redirect to the login page only if user confirms and is not logged in
      navigate('/login')
    } else if (!isConfirmed) {
      // Close the toast notification if the user cancels
      toast.dismiss()
      navigate('/')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1,
            ease: 'easeInOut',
          },
        }}
        viewport={{ once: false }}
        className="blog-card"
      >
        <Link to={`/blogs/${blog?.id}`}>
          <img
            className="blog-thumb"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
              blog.thumbnail
            }`}
            alt="thumbnail"
          />
        </Link>
        <div className="mt-2 relative">
          <Link to={`/blogs/${blog?.id}`}>
            <div className="text-slate-300 text-xl lg:text-2xl">
              {blog?.title}
            </div>

            <p className="mb-6  text-base text-slate-500 mt-1 ">
              {blog?.content}
            </p>
          </Link>
          {/* <!-- Meta Informations --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <Link to={`/profile/${blog?.author?.id}`}>
                  <img className="avater-img" src={avatarURL} alt="avatar" />
                </Link>
              </div>

              <div>
                <div>
                  <h5
                    onClick={handleProfileClick}
                    className="text-slate-500 text-sm"
                  >
                    <Link to={`/profile/${blog?.author?.id}`}>
                      {blog?.author?.firstName} {blog?.author?.lastName}
                    </Link>
                  </h5>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>{blog?.likes?.length || 0} Likes</span>
            </div>
          </div>

          {/* <!-- action dot --> */}
          <div className="absolute right-0 top-0">
            {isMyBlog && (
              <button onClick={toggleAction}>
                <img src={dots} alt="3dots of Action" />
              </button>
            )}

            {/* <!-- Action Menus Popup --> */}
            {showAction && (
              <div className="action-modal-container">
                <div>
                  <button
                    onClick={modalAction}
                    className="action-menu-item hover:text-lwsGreen"
                  >
                    <img src={editIcon} alt="Edit" />
                    Edit
                  </button>
                  {showModal && (
                    <Portal>
                      <EditBlogModal
                        onClose={() => setShowModal(false)}
                        blog={blog}
                        onUpdateBlog={onUpdateBlog}
                      />
                    </Portal>
                  )}
                </div>

                <button
                  onClick={handleDeletePost}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src={deleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
          {/* <!-- action dot ends --> */}
        </div>
      </motion.div>
    </>
  )
}

export default BlogPostList
