import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden'>
      {/* Enhanced Background decorations */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/5 rounded-full blur-2xl animate-pulse' style={{animationDelay: '1s'}}></div>
      </div>

      {/* Enhanced Pattern overlay */}
      <div className='absolute inset-0 opacity-5'>
        <div 
          className='absolute inset-0' 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      <div className='relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
        <div className='py-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            
            {/* Enhanced Brand Section */}
            <div className='lg:col-span-2 space-y-8'>
              <div>
                <div className='relative inline-block'>
                  <img 
                    className='w-48 mb-6 brightness-0 invert hover:scale-105 transition-transform duration-300' 
                    src={assets.logo} 
                    alt="Prescripto Logo" 
                  />
                  <div className='absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <p className='text-gray-300 leading-relaxed text-base max-w-md mb-6'>
                  Your trusted healthcare partner providing seamless appointment booking with qualified doctors. 
                  Experience quality healthcare from the comfort of your home with our innovative platform.
                </p>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className='space-y-6'>
              <h3 className='text-white font-semibold text-lg flex items-center gap-2'>
                <div className='w-1 h-6 bg-gradient-to-b from-primary to-purple-600 rounded-full'></div>
                Quick Links
              </h3>
              <ul className='space-y-4'>
                <li>
                  <a href='/' className='text-gray-300 hover:text-primary transition-all duration-300 flex items-center gap-3 group'>
                    <svg className='w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'></path>
                    </svg>
                    <span className='group-hover:translate-x-2 transition-transform duration-300'>Home</span>
                  </a>
                </li>
                <li>
                  <a href='/about' className='text-gray-300 hover:text-primary transition-all duration-300 flex items-center gap-3 group'>
                    <svg className='w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'></path>
                    </svg>
                    <span className='group-hover:translate-x-2 transition-transform duration-300'>About us</span>
                  </a>
                </li>
                <li>
                  <a href='/contact' className='text-gray-300 hover:text-primary transition-all duration-300 flex items-center gap-3 group'>
                    <svg className='w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'></path>
                    </svg>
                    <span className='group-hover:translate-x-2 transition-transform duration-300'>Contact us</span>
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-300 hover:text-primary transition-all duration-300 flex items-center gap-3 group'>
                    <svg className='w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'></path>
                    </svg>
                    <span className='group-hover:translate-x-2 transition-transform duration-300'>Privacy policy</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div className='space-y-6'>
              <h3 className='text-white font-semibold text-lg flex items-center gap-2'>
                <div className='w-1 h-6 bg-gradient-to-b from-primary to-purple-600 rounded-full'></div>
                Get In Touch
              </h3>
              <ul className='space-y-5'>
                <li className='flex items-start gap-4 text-gray-300 group hover:text-white transition-colors duration-300'>
                  <div className='w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center mt-0.5 group-hover:bg-primary/30 transition-colors duration-300'>
                    <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
                    </svg>
                  </div>
                  <div>
                    <div className='font-medium'>Phone</div>
                    <span className='hover:text-primary transition-colors duration-200 cursor-pointer'>+1-212-456-7890</span>
                  </div>
                </li>
                <li className='flex items-start gap-4 text-gray-300 group hover:text-white transition-colors duration-300'>
                  <div className='w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center mt-0.5 group-hover:bg-primary/30 transition-colors duration-300'>
                    <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                    </svg>
                  </div>
                  <div>
                    <div className='font-medium'>Email</div>
                    <span className='hover:text-primary transition-colors duration-200 cursor-pointer'>support@prescripto.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className='border-t border-gray-700/50 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <p className='text-gray-400 text-sm flex items-center gap-2'>
              © 2024 Prescripto. All rights reserved. | Designed with 
              <span className='text-red-400 animate-pulse'>❤️</span> 
              for better healthcare
            </p>
            <div className='flex items-center space-x-6 text-sm text-gray-400'>
              <a href='#' className='hover:text-primary transition-colors duration-300 relative group'>
                <span>Terms of Service</span>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300'></div>
              </a>
              <span className='text-gray-600'>•</span>
              <a href='#' className='hover:text-primary transition-colors duration-300 relative group'>
                <span>Privacy Policy</span>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300'></div>
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
