import { useState } from 'react'
import closeIcon from '../../assets/icons/close.svg'
import nFound from '../../assets/notFound2.png'
import useAxios from '../../hooks/useAxios'
import useDebounce from '../../hooks/useDebounce'
import ModalDataList from './ModalDataList'

const ModalContent = ({ onClose }) => {
  const [blogs, setBlogs] = useState([])
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState('')
  const { api } = useAxios()

  // Function to perform the search
  const search = async query => {
    try {
      if (!query) {
        setBlogs([])
        setNotFound('Please provide a search query')
        return
      }

      // Send search query to the server
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`
      )
      if (response.status === 200) {
        // If search is successful, update blogs state and clear not found message
        setBlogs(response.data.data)
        setNotFound('')
      }
    } catch (error) {
      // Handle errors from the server
      setBlogs([])

      // Display appropriate error message
      if (error.response && error.response.status === 404) {
        setNotFound(error.response.data.message)
      } else {
        setNotFound('An error occurred while fetching data')
      }
      console.log(error.response ? error.response.data.message : error.message)
    }
  }

  // Debounce the search function to avoid frequent API calls
  const debouncedSearch = useDebounce(search, 500)

  // Event handler for input change to trigger search
  const handleSearchChange = event => {
    const value = event.target.value
    setQuery(value)
    debouncedSearch(value) // debounce the search query
  }

  return (
    <div role="dialog" aria-modal="true">
      <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
        <div className="absolute w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          <div>
            <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
              Search for Your Desired Blogs
            </h3>
            <form>
              {' '}
              <input
                type="text"
                placeholder="Start Typing to Search"
                value={query}
                onChange={handleSearchChange}
                className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
              />
            </form>
          </div>

          <div className="">
            <h3 className="text-slate-400 font-bold mt-6">
              Search Results : {blogs?.length}
            </h3>
            <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
              {Array.isArray(blogs) && blogs.length > 0
                ? blogs.map(blog => <ModalDataList key={blog.id} blog={blog} />)
                : // Conditionally render the image only when there are no search results
                  notFound && (
                    <div>
                      <h4 className="text-xl text-red-700 font-bold">
                        {notFound}
                      </h4>
                      <img className="w-32" src={nFound} alt="" />
                    </div>
                  )}
            </div>
          </div>

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
  )
}

export default ModalContent
