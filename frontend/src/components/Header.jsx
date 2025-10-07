import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative overflow-hidden'>
            {/* Background with gradients */}
            <div className='absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-indigo-700'></div>
            <div className='absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20'></div>
            
            {/* Decorative elements */}
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl'></div>
            
            <div className='relative flex flex-col md:flex-row flex-wrap rounded-2xl px-6 md:px-10 lg:px-20 py-12 md:py-16'>
                {/* --------- Header Left --------- */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] md:mb-[-30px] z-10'>
                    <div className='space-y-4'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight'>
                            Book Appointment
                            <br />
                            <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
                                With Trusted Doctors
                            </span>
                        </h1>
                        <div className='h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full'></div>
                    </div>
                    
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-4 text-white/90 text-base font-light'>
                        <div className='flex items-center gap-3'>
                            <div className='relative'>
                                <img className='w-32 drop-shadow-lg' src={assets.group_profiles} alt="" />
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center'>
                                    <span className='text-green-800 text-xs font-bold'>✓</span>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-md'>
                            <p className='text-white/80 leading-relaxed'>
                                Simply browse through our extensive list of trusted doctors and 
                                <span className='text-yellow-300 font-medium'> schedule your appointment hassle-free.</span>
                            </p>
                            <div className='flex items-center gap-2 mt-2'>
                                <div className='flex text-yellow-400'>
                                    {'★'.repeat(5)}
                                </div>
                                <span className='text-white/70 text-sm'>500+ Happy Patients</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                        <a 
                            href='#speciality' 
                            className='group flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full text-gray-700 font-medium hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl'
                        >
                            <span>Book Appointment</span>
                            <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform'>
                                <img className='w-4' src={assets.arrow_icon} alt="" />
                            </div>
                        </a>
                        
                        <button className='flex items-center gap-3 border-2 border-white/30 px-8 py-4 rounded-full text-white font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                            <span>Learn More</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className='flex items-center gap-8 mt-8 text-white/80'>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>50+</div>
                            <div className='text-sm'>Expert Doctors</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>1000+</div>
                            <div className='text-sm'>Happy Patients</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>98%</div>
                            <div className='text-sm'>Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* --------- Header Right --------- */}
                <div className='md:w-1/2 relative flex items-center justify-center'>
                    <div className='relative'>
                        {/* Decorative background circle */}
                        <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl transform scale-110'></div>
                        
                        {/* Image container */}
                        <div className='relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl'>
                            <img 
                                className='w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                                src={assets.header_img} 
                                alt="Doctor" 
                            />
                            
                            {/* Floating elements */}
                            <div className='absolute -top-4 -right-4 bg-green-400 text-green-800 px-4 py-2 rounded-full font-semibold shadow-lg animate-bounce'>
                                Available Now
                            </div>
                            
                            <div className='absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                                    <span className='text-gray-700 text-sm font-medium'>Online Consultation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header