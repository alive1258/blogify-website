import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'

const SingleBlog = ({ blog }) => {
  const navigate = useNavigate()
  const { auth } = useAuth()

  // Function to handle clicking on the author's profile
  const handleProfileClick = () => {
    // Check if the user is logged in
    if (auth?.user) return

    // Ask for confirmation to log in to view the profile
    const isConfirmed = window.confirm(
      `To view the Profile, you have to log in first`
    )

    // If user confirms and is not logged in, redirect to the login page
    if (!auth?.user && isConfirmed) {
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
      {/* Display the blog information */}
      <li>
        <Link to={`/blogs/${blog?.id}`}>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            {blog?.title}
          </h3>
        </Link>
        <div className="text-slate-600 text-sm flex">
          by
          <div>
            <div onClick={handleProfileClick}>
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
            </div>
          </div>
          <span>·</span> {blog?.likes?.length} Likes
        </div>
      </li>
    </>
  )
}

export default SingleBlog
