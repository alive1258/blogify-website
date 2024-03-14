import BlogCard from './BlogCard'

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs?.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
