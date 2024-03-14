import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
  return (
    <>
      <main>
        <section className="container">
          {/* <!-- Login Form into a box center of the page --> */}
          <div>
            <LoginForm />
            <p className="text-center">
              Dont have an account?
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
