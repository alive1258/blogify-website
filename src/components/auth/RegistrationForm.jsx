import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Field from '../common/Field'

// RegistrationForm component for user registration
const RegistrationForm = () => {
  const navigate = useNavigate()

  // Hook for managing form state
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  // Function to handle form submission
  const submitForm = async formData => {
    console.log(formData)
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      )

      if (response.status === 201) {
        // Show success message and redirect to login page
        toast.success('Registration successful!', {
          position: toast.TOP_RIGHT,
        })
        navigate('/login')
      }
    } catch (error) {
      // Set error message for form field
      setError('root.random', {
        type: 'random',
        message: `Something went wrong: ${error.message}`,
      })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Field label="First Name" error={errors.firstName}>
          <input
            {...register('firstName', {
              required: 'First Name is Required',
            })}
            className={`auth-input ${
              errors.firstName ? 'border-red-500' : 'border-white/20'
            }`}
            type="firstName"
            name="firstName"
            id="firstName"
          />
        </Field>

        <Field label="Last Name" error={errors.lastName}>
          <input
            {...register('lastName', {
              required: 'Last  Name is Required',
            })}
            className={`auth-input ${
              errors.lastName ? 'border-red-500' : 'border-white/20'
            }`}
            type="lastName"
            name="lastName"
            id="lastName"
          />
        </Field>

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
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  )
}

export default RegistrationForm
