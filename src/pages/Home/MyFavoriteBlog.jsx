const MyFavoriteBlog = ({ blog }) => {
  // Split tags string into an array and trim each tag
  const tagsArray = blog?.tags?.split(',').map(tag => tag?.trim())
  return (
    <>
      <li>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {blog?.title}
        </h3>

        {/* Display tags of the blog */}
        <p className="text-slate-600 text-sm">
          {/* Map over tagsArray to display each tag */}
          {tagsArray?.map((tag, index) => (
            <span key={index}>
              #{tag} {/* Display tag with hashtag */}
              {/* Add a comma and space after each tag except the last one */}
              {index !== tagsArray.length - 1 && ', '}
            </span>
          ))}
        </p>
      </li>
    </>
  )
}

export default MyFavoriteBlog
