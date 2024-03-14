import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import Field from '../common/Field'

// LoginForm component for user login
const LoginForm = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  // React Hook Form methods for form validation and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  // Function to handle form submission
  const submitForm = async formData => {
    try {
      // Send POST request to login endpoint with form data
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      )

      // Handle successful login response
      if (response.status === 200) {
        const { token, user } = response.data
        if (token) {
          const accessToken = token.accessToken
          // Store tokens and user data in localStorage
          localStorage.setItem('token', accessToken)
          localStorage.setItem('user', JSON.stringify(user))

          // Update authentication state with access token and user data
          setAuth({ accessToken, user })
          navigate('/') // Redirect to home page after successful login

          // Show success message using toast notification
          toast.success('Login successful!', { position: toast.TOP_RIGHT })
        }
      }
    } catch (error) {
      // Set custom error message for the email field if user not found
      setError('root.random', {
        type: 'random',
        message: `User with email ${formData.email} is not found`,
      })
    }
  }

  return (
    <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-6">
          <Field label="Email" error={errors.email}>
            <input
              {...register('email', { required: 'Email ID is Required' })}
              className={`auth-input ${
                errors.email ? 'border-red-500' : 'border-white/20'
              }`}
              type="email"
              name="email"
              id="email"
            />
          </Field>
        </div>
        <div className="mb-6">
          <Field label="Password" error={errors.password}>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Your password must be at least 8 characters',
                },
              })}
              className={`auth-input ${
                errors.password ? 'border-red-500' : 'border-white/20'
              }`}
              type="password"
              name="password"
              id="password"
            />
          </Field>
          <p>{errors?.root?.random?.message}</p>
        </div>

        <div className="mb-6">
          <Field>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Login
            </button>
          </Field>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
