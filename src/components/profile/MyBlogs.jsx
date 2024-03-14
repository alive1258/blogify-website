import { useProfile } from '../../hooks/useProfile'
import BlogList from './BlogList'

const MyBlogs = () => {
  const { state } = useProfile()
  const blogs = state?.blogs
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {/* <!-- Blog Card Start --> */}
        <BlogList blogs={blogs} />
        {/* <!-- Blog Card End --> */}
      </div>
    </>
  )
}

export default MyBlogs
