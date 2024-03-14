import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from '../../hooks/useAxios'

// WriteBlog component for creating a new blog post
const WriteBlog = () => {
  const navigate = useNavigate()
  const { api } = useAxios()
  const [postData, setPostData] = useState({
    id: '',
    title: '',
    content: '',
    tags: [],
    thumbnail: null,
  })
  const [thumbnailUrl, setThumbnailUrl] = useState('') // State to hold the thumbnail URL
  const [error, setError] = useState(null)

  // Function to handle input changes
  const handleChange = event => {
    const { name, value } = event.target
    if (name === 'tags') {
      // Split the tags input by comma and remove any whitespace
      const tagsArray = value.split(',').map(tag => tag.trim())
      setPostData(prevFromData => ({
        ...prevFromData,
        [name]: tagsArray, // Update the tags with the array of tags
      }))
    } else {
      setPostData(prevFromData => ({
        ...prevFromData,
        [name]: value,
      }))
    }
  }

  // Reference for thumbnail input
  const thumbnailRef = useRef()

  // Function to handle thumbnail file change
  const handleFileChange = event => {
    const file = event.target.files[0]
    setPostData(prevFormData => ({
      ...prevFormData,
      thumbnail: file,
    }))
    setThumbnailUrl(URL.createObjectURL(file)) // Set the thumbnail URL
  }

  // Function to handle form submission
  const handlePostSubmit = async event => {
    event.preventDefault()
    // Check if any required fields are empty
    if (
      !postData.title ||
      !postData.content ||
      postData.tags.length === 0 ||
      !postData.thumbnail
    ) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', postData.title)
      formData.append('content', postData.content)
      formData.append('tags', postData.tags)
      formData.append('thumbnail', postData.thumbnail)

      const res = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
        formData
      )

      if (res?.status === 201) {
        // Redirect to the newly created blog post
        navigate(`/blogs/${res?.data?.blog?.id}`)
        toast.success('Blog created successfully')
      } else {
        console.error('Unexpected status code:', res?.status)
        setError('Error occurred while creating blog')
      }
    } catch (error) {
      console.error(error.message)
      setError('Error occurred while creating blog')
    }
  }

  return (
    <div className="container pt-28">
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
          )}{' '}
          {/* Display the thumbnail image */}
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="title"
            placeholder="Enter your blog title"
            value={postData?.title}
            onChange={handleChange}
            name="title"
            required
          />
          {error && !postData?.title && (
            <div className="text-red-700 font-semibold">Title is required</div>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="tags"
            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
            value={postData?.tags.join(', ')} // Join the tags array with commas and space
            onChange={handleChange}
            name="tags"
            required
          />
          {error && postData?.tags?.length === 0 && (
            <div className="text-red-700 font-semibold">Tags are required</div>
          )}
        </div>
        <div className="mb-6">
          <textarea
            id="content"
            placeholder="Write your blog content"
            rows="8"
            value={postData?.content}
            onChange={handleChange}
            name="content"
            required
          />
          {error && !postData?.content && (
            <div className="text-red-700 font-semibold">
              Content is required
            </div>
          )}
        </div>
        {error && <div className="text-red-700 font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Create Blog
        </button>
      </form>
    </div>
  )
}

export default WriteBlog
