import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Login Card */}
        <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden'>
          {/* Header */}
          <div className={`p-8 text-center ${state === 'Admin' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-green-500 to-teal-600'}`}>
            <div className='w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg'>
              {state === 'Admin' ? (
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              {state} Login
            </h1>
            <p className='text-white/90 text-sm'>
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='p-8 space-y-6'>
            {/* Email Input */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                  type="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                  type="password" 
                  placeholder="Enter your password"
                  required 
                />
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                state === 'Admin' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
              }`}
            >
              Sign In
            </button>

            {/* Toggle Login Type */}
            <div className='text-center pt-4 border-t border-gray-200'>
              <p className='text-gray-600 mb-3'>
                {state === 'Admin' ? 'Are you a doctor?' : 'Are you an admin?'}
              </p>
              <button 
                type="button"
                onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  state === 'Admin'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Switch to {state === 'Admin' ? 'Doctor' : 'Admin'} Login
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-gray-500 text-sm'>
            © 2024 Prescripto. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login