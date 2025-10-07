import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Welcome back!')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10'></div>
      
      <div className='relative max-w-md w-full space-y-8'>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-4'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
              </svg>
            </div>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className='mt-2 text-gray-600'>
              {state === 'Sign Up' 
                ? 'Join us to book appointments with ease' 
                : 'Sign in to access your appointments'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {state === 'Sign Up' && (
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/50 backdrop-blur-sm'
                    type="text"
                    placeholder='Enter your full name'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/50 backdrop-blur-sm'
                  type="email"
                  placeholder='Enter your email'
                  required
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/50 backdrop-blur-sm pr-12'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 flex items-center pr-3 hover:text-primary transition-colors'
                >
                  {showPassword ? (
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
                    </svg>
                  ) : (
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              {loading ? (
                <div className='flex items-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  {state === 'Sign Up' ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                <>
                  {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
                  <svg className='ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd'></path>
                  </svg>
                </>
              )}
            </button>

            {/* Toggle Link */}
            <div className='text-center pt-4'>
              <p className='text-gray-600'>
                {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                  className='ml-2 font-medium text-primary hover:text-purple-600 transition-colors duration-200 hover:underline'
                >
                  {state === 'Sign Up' ? 'Sign in here' : 'Create one here'}
                </button>
              </p>
            </div>
          </form>

          {/* Additional Links */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <div className='text-center'>
              <p className='text-sm text-gray-500'>
                Want to join as a doctor?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className='font-medium text-primary hover:text-purple-600 transition-colors duration-200 hover:underline'
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-xl animate-pulse'></div>
        <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-xl animate-pulse' style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  )
}

export default Login