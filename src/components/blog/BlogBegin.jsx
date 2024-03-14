import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import { formatDate } from '../../utils'

const BlogBegin = ({ blog, likeCount }) => {
  const { auth } = useAuth()
  const { state } = useProfile()

  // Check if the profile belongs to the authenticated user
  const isMyProfile = auth?.user?.id === state?.user?.id
  const user = state?.user ?? auth?.user

  let pic
  let firstNameInitial

  if (auth?.user?.avatar != null) {
    pic = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
      blog?.author?.avatar
    }`
  } else {
    firstNameInitial = auth?.user?.firstName
      ? auth.user.firstName.charAt(0)
      : ''
  }

  const formattedDate = formatDate(blog?.createdAt)
  // Parse the tags string into an array
  const tagsArray = blog?.tags?.split(',').map(tag => tag.trim())

  const handleProfileClick = () => {
    if (!auth.user) {
      toast.error('After logging in first, Then you can visit this profile.', {
        position: toast.TOP_RIGHT,
      })
      return
    }
  }

  return (
    <>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div
              onClick={handleProfileClick}
              className="avater-img bg-indigo-600 text-white"
            >
              {isMyProfile ? (
                user?.avatar != null ? (
                  <div className="avater-img">
                    <img className="avater-img rounded-full" src={pic} alt="" />
                  </div>
                ) : (
                  <div className="avater-img bg-orange-600 text-white">
                    <span>{firstNameInitial}</span>
                  </div>
                )
              ) : (
                <img
                  className="avater-img"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${blog?.author?.avatar}`}
                  alt="avatar"
                />
              )}
            </div>

            <h5
              onClick={handleProfileClick}
              className="text-slate-500 font-bold cursor-pointer"
            >
              {auth.user ? (
                <Link to={`/profile/${blog?.author?.id}`}>
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </Link>
              ) : (
                <span>
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </span>
              )}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">{formattedDate}</span>
          <span className="text-sm text-slate-700 dot">
            {/* {blog?.likes?.length ?? 0} Likes */}
            {likeCount} Likes
          </span>
        </div>

        <motion.img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blog.thumbnail
          }`}
          alt="thumbnail"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
          }}
        />

        {/* <!-- Tags --> */}
        <ul className="tags">
          {tagsArray?.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>

        {/* <!-- Content --> */}
        <div className="mx-auto md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {blog?.content}
        </div>
      </div>
    </>
  )
}

export default BlogBegin
