import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import closeIcon from '../../assets/icons/close.svg'
import useAxios from '../../hooks/useAxios'

// Component for editing a blog post
const EditBlogModal = ({ onClose, blog, onUpdateBlog }) => {
  const { api } = useAxios()
  const [thumbnailUrl, setThumbnailUrl] = useState('') // State to hold the thumbnail URL
  const [error, setError] = useState(null)
  const [postData, setPostData] = useState({
    id: blog.id,
    title: blog.title,
    tags: blog.tags,
    content: blog.content,
    thumbnail: blog.thumbnail,
  })

  // Function to handle input changes
  const handleChange = e => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
  }

  const thumbnailRef = useRef()
  // Function to handle file input change
  const handleFileChange = event => {
    const file = event.target.files[0]
    setPostData(prevFormData => ({
      ...prevFormData,
      thumbnail: file,
    }))
    setThumbnailUrl(URL.createObjectURL(file)) // Set the thumbnail URL
  }

  // Function to handle form submission
  const handlePostSubmit = async e => {
    e.preventDefault()

    // Check if any required fields are empty
    if (!postData.title) {
      setError('Please enter a title')
      return
    }

    if (!postData.tags) {
      setError('Please enter tags')
      return
    }

    if (!postData.content) {
      setError('Please enter content')
      return
    }

    if (!postData.thumbnail && postData.thumbnail !== null) {
      setError('Please upload a thumbnail image')
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', postData.title)
      formData.append('tags', postData.tags)
      formData.append('content', postData.content)
      formData.append('thumbnail', postData.thumbnail)

      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      // Check if the update was successful
      if (response.status === 200) {
        toast.success('Blog updated successfully')
        onUpdateBlog(postData)
        // onUpdateBlog(blog.id)
        onClose()
      } else {
        setError('Failed to update blog. Please try again.')
      }
    } catch (error) {
      setError('An error occurred while updating the blog.')
      console.error('Error updating blog:', error)
    }
  }

  useEffect(() => {
    // Set thumbnail URL if a thumbnail exists in the blog data
    if (blog.thumbnail) {
      setThumbnailUrl(
        `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog.thumbnail}`
      )
    }
  }, [blog.thumbnail])
  return (
    <>
      <div role="dialog" aria-modal="true">
        <div>
          <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            <div className="absolute w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
              <div>
                <h3 className="font-bold text-center text-xl pl-2 text-slate-400 my-2">
                  Edit Blog
                </h3>
              </div>

              <form onSubmit={handlePostSubmit} className="createBlog">
                <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                  <div>
                    <label
                      onClick={() => thumbnailRef.current.click()}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      <span>Upload Your Image</span>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      ref={thumbnailRef}
                      onChange={handleFileChange}
                      hidden
                    />
                  </div>
                  {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Thumbnail" className="h-24 " />
                  )}
                </div>

                <input
                  className=" py-2"
                  type="text"
                  id="title"
                  placeholder="Enter your blog title"
                  value={postData.title}
                  onChange={handleChange}
                  name="title"
                  required
                />
                {!postData.title && (
                  <div className="text-red-500">Title is required</div>
                )}
                <input
                  className=" py-2"
                  type="text"
                  id="tags"
                  placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                  value={postData.tags}
                  onChange={handleChange}
                  name="tags"
                  required
                />
                {!postData.tags && (
                  <div className="text-red-500">Tags are required</div>
                )}
                <textarea
                  id="content"
                  placeholder="Write your blog content"
                  rows="8"
                  value={postData.content}
                  onChange={handleChange}
                  name="content"
                  required
                />
                {!postData.content && (
                  <div className="text-red-500">Content is required</div>
                )}
                {error && <div>{error}</div>}
                <button
                  type="submit"
                  className="bg-indigo-600 w-full text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Edit Blog
                </button>
              </form>

              <button onClick={onClose}>
                <img
                  src={closeIcon}
                  alt="Close"
                  className="absolute right-2 top-2 cursor-pointer w-8 h-8"
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default EditBlogModal
