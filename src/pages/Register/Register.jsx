import { Link } from 'react-router-dom'
import RegistrationForm from '../../components/auth/RegistrationForm'

const Register = () => {
  return (
    <>
      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <RegistrationForm />
            <p className="text-center">
              Already have account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Register
