import { Link, useRouteError } from 'react-router-dom'
import n404 from '../../assets/n404.png'

// Component for displaying an error page
const ErrorPage = () => {
  // Using the useRouteError hook to retrieve error information from the route
  const error = useRouteError()
  // Logging the error to the console for debugging purposes
  console.error(error)
  return (
    <div>
      {/* Error message display */}
      <div id="error-page" className="text-center mt-20">
        <div className="flex justify-center items-center">
          <img src={n404} alt="" />
        </div>

        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {/* Displaying error status text or message */}
        <p className="text-red-700 font-semibold">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>

      {/* Button to navigate back to home page */}
      <div className="text-center mt-6">
        <button className="bg-indigo-600 p-4 rounded-lg">
          <Link to="/">Go Back to Home</Link>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
