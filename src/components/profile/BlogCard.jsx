import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import { getDateDifferenceFromNow } from '../../utils'

const BlogCard = ({ blog }) => {
  const { state } = useProfile()
  const { auth } = useAuth()
  // Calculate the time difference since the blog post was created
  const timeDifference = getDateDifferenceFromNow(blog?.createdAt)

  // Determine the user's avatar or initials
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

  return (
    <>
      <div className="blog-card">
        <img
          className="blog-thumb"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blog.thumbnail
          }`}
          alt="thumbnail"
        />
        <div className="mt-2">
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1 overflow-hidden">
            {blog?.content}
          </p>

          {/* <!-- Meta Informations --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                {user.avatar != null ? (
                  <div>
                    <img
                      className="max-w-full avater-img rounded-full"
                      src={pic}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="text-xl">{firstNameInitial}</span>
                  </div>
                )}
              </div>

              <div>
                <h5 className="text-slate-500 text-sm">
                  {state?.user?.firstName} {state?.user?.lastName}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{timeDifference}</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span className="ml-1">{blog?.likes?.length} likes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogCard
