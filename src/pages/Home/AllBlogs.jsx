import BlogPostList from './BlogPostList'

const AllBlogs = ({ blogs, onDelete, onUpdateBlog }) => {
  return (
    <>
      <div className="space-y-3 md:col-span-5">
        {blogs?.map(blog => (
          <BlogPostList
            key={blog.id}
            blog={blog}
            onDelete={onDelete}
            onUpdateBlog={onUpdateBlog}
          />
        ))}
      </div>
    </>
  )
}

export default AllBlogs
