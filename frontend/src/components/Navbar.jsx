import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm'>
      <div className='flex items-center justify-between text-sm py-4 mb-5 px-4 max-w-7xl mx-auto'>
        {/* Logo */}
        <img 
          onClick={() => navigate('/')} 
          className='w-44 cursor-pointer hover:scale-105 transition-transform duration-300' 
          src={assets.logo} 
          alt="Prescripto Logo" 
        />
        
        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-medium hidden'>
          <NavLink to='/' className='group'>
            <li className='py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <span className='group-hover:text-primary transition-colors duration-200'>HOME</span>
            </li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-purple-600 w-0 group-hover:w-full transition-all duration-300 m-auto hidden' />
          </NavLink>
          
          <NavLink to='/doctors' className='group'>
            <li className='py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <span className='group-hover:text-primary transition-colors duration-200'>ALL DOCTORS</span>
            </li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-purple-600 w-0 group-hover:w-full transition-all duration-300 m-auto hidden' />
          </NavLink>
          
          <NavLink to='/about' className='group'>
            <li className='py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <span className='group-hover:text-primary transition-colors duration-200'>ABOUT</span>
            </li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-purple-600 w-0 group-hover:w-full transition-all duration-300 m-auto hidden' />
          </NavLink>
          
          <NavLink to='/contact' className='group'>
            <li className='py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <span className='group-hover:text-primary transition-colors duration-200'>CONTACT</span>
            </li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-purple-600 w-0 group-hover:w-full transition-all duration-300 m-auto hidden' />
          </NavLink>
        </ul>

        {/* User Profile or Sign Up */}
        <div className='flex items-center gap-4'>
          {token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <div className='relative'>
                <img 
                  className='w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-primary transition-all duration-300' 
                  src={userData.image} 
                  alt="Profile" 
                />
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></div>
              </div>
              
              <div className='hidden sm:block'>
                <p className='font-medium text-gray-800 group-hover:text-primary transition-colors duration-200'>
                  {userData.name}
                </p>
                <p className='text-xs text-gray-500'>Patient</p>
              </div>
              
              <img 
                className='w-3 h-3 group-hover:rotate-180 transition-transform duration-300' 
                src={assets.dropdown_icon} 
                alt="Dropdown" 
              />
              
              {/* Dropdown Menu */}
              <div className='absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                <div className='p-2'>
                  <button
                    onClick={() => navigate('/my-profile')}
                    className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200 group/item'
                  >
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                      </svg>
                    </div>
                    <div>
                      <p className='font-medium text-gray-800 group-hover/item:text-primary transition-colors duration-200'>My Profile</p>
                      <p className='text-xs text-gray-500'>Manage your account</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200 group/item'
                  >
                    <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                      </svg>
                    </div>
                    <div>
                      <p className='font-medium text-gray-800 group-hover/item:text-primary transition-colors duration-200'>My Appointments</p>
                      <p className='text-xs text-gray-500'>View your bookings</p>
                    </div>
                  </button>
                  
                  <div className='h-px bg-gray-200 my-2 mx-4'></div>
                  
                  <button
                    onClick={logout}
                    className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors duration-200 group/item'
                  >
                    <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover/item:bg-red-500 group-hover/item:text-white transition-all duration-200'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
                      </svg>
                    </div>
                    <div>
                      <p className='font-medium text-gray-800 group-hover/item:text-red-600 transition-colors duration-200'>Logout</p>
                      <p className='text-xs text-gray-500'>Sign out of account</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/register')} 
              className='bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-3 rounded-full font-medium hidden md:block transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            >
              Sign Up
            </button>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='w-8 h-8 md:hidden flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200'
          >
            <img className='w-6' src={assets.menu_icon} alt="Menu" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 z-50 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300`}>
          {/* Backdrop */}
          <div 
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setShowMenu(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <img src={assets.logo} className='w-36' alt="Logo" />
              <button 
                onClick={() => setShowMenu(false)}
                className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <img src={assets.cross_icon} className='w-6' alt="Close" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <ul className='p-6 space-y-2'>
              <li>
                <NavLink 
                  onClick={() => setShowMenu(false)} 
                  to='/'
                  className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group'
                >
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
                    </svg>
                  </div>
                  <span className='font-medium text-gray-800 group-hover:text-primary transition-colors duration-200'>HOME</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  onClick={() => setShowMenu(false)} 
                  to='/doctors'
                  className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group'
                >
                  <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                    </svg>
                  </div>
                  <span className='font-medium text-gray-800 group-hover:text-primary transition-colors duration-200'>ALL DOCTORS</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  onClick={() => setShowMenu(false)} 
                  to='/about'
                  className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group'
                >
                  <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                  </div>
                  <span className='font-medium text-gray-800 group-hover:text-primary transition-colors duration-200'>ABOUT</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  onClick={() => setShowMenu(false)} 
                  to='/contact'
                  className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group'
                >
                  <div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                    </svg>
                  </div>
                  <span className='font-medium text-gray-800 group-hover:text-primary transition-colors duration-200'>CONTACT</span>
                </NavLink>
              </li>
            </ul>
            
            {/* Mobile Sign Up Button */}
            {!token && (
              <div className='p-6 border-t border-gray-200'>
                <button 
                  onClick={() => { navigate('/register'); setShowMenu(false) }} 
                  className='w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg'
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
