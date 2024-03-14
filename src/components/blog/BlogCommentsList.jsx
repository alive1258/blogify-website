import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import deleteIcon from '../../assets/icons/delete.svg'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'

const BlogCommentsList = ({ comments, setComments }) => {
  const { auth } = useAuth()
  // const navigate = useNavigate()
  const { api } = useAxios()
  const { id } = useParams()

  // Function to handle deletion of a comment.
  const handleDeleteComment = async commentId => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this comment?'
    )
    if (!isConfirmed) return
    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs/${id}/comment/${commentId}`
      )
      if (response.status === 200) {
        // Update the UI to remove the deleted comment
        setComments(comments.filter(comment => comment.id !== commentId))
        // Show success toast notification
        toast.success('Comment deleted successfully', {
          position: toast.TOP_RIGHT,
        })
      }
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }
  }

  // Function to handle click on author's profile.
  const handleProfileClick = () => {
    if (!auth?.user) {
      toast.error('After logging in first, Then you can visit this profile.', {
        position: toast.TOP_RIGHT,
      })
      return
    }
  }
  return (
    <>
      <div>
        {comments?.map(comment => {
          let pic
          let firstNameInitial

          if (comment?.author?.avatar != null) {
            pic = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              comment?.author?.avatar
            }`
          } else {
            firstNameInitial = comment?.author?.firstName
              ? comment?.author?.firstName.charAt(0)
              : ''
          }

          return (
            <div key={comment.id} className="flex items-start space-x-4 my-8">
              <div className="avater-img bg-orange-600 text-white">
                {comment?.author?.avatar != null ? (
                  <div className="avater-img">
                    <img className="avater-img rounded-full" src={pic} alt="" />
                  </div>
                ) : (
                  <div className="avater-img bg-orange-600 text-white">
                    <span>{firstNameInitial}</span>
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center pr-3">
                  <h5
                    onClick={handleProfileClick}
                    className="text-slate-500 font-bold cursor-pointer"
                  >
                    {auth?.user ? (
                      <Link to={`/profile/${comment?.author?.id}`}>
                        {comment?.author?.firstName} {comment?.author?.lastName}
                      </Link>
                    ) : (
                      <span>
                        {comment?.author?.firstName} {comment?.author?.lastName}
                      </span>
                    )}
                  </h5>
                  {auth?.user?.id === comment?.author?.id && (
                    <img
                      className="cursor-pointer"
                      src={deleteIcon}
                      alt="deleteIcon"
                      onClick={() => handleDeleteComment(comment?.id)}
                    />
                  )}
                </div>
                <p className="text-slate-300">{comment?.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BlogCommentsList
