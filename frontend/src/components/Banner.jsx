import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative my-24 mx-4 md:mx-10 overflow-hidden'>
            {/* Background with gradients and patterns */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-700 rounded-3xl'></div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/20 to-indigo-800/30 rounded-3xl'></div>
            
            {/* Decorative elements */}
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl'></div>
            <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl'></div>
            
            {/* Pattern overlay */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute inset-0' style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className='relative flex flex-col lg:flex-row items-center px-6 sm:px-10 md:px-14 lg:px-12 py-12 lg:py-20 rounded-3xl'>
                {/* ------- Left Side ------- */}
                <div className='flex-1 lg:pr-8 text-center lg:text-left'>
                    <div className='space-y-6'>
                        {/* Badge */}
                        <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
                            <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                            <span className='text-white/90 font-medium text-sm'>Join thousands of satisfied patients</span>
                        </div>

                        {/* Main heading */}
                        <div className='space-y-4'>
                            <h2 className='text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight'>
                                Book Appointment
                            </h2>
                            <p className='text-2xl sm:text-3xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text leading-tight'>
                                With 100+ Trusted Doctors
                            </p>
                        </div>

                        {/* Description */}
                        <p className='text-white/80 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0'>
                            Access quality healthcare from the comfort of your home. Schedule consultations with 
                            experienced doctors across various specialties.
                        </p>

                        {/* Stats */}
                        <div className='flex items-center justify-center lg:justify-start gap-8 text-white/90 text-sm'>
                            <div className='text-center'>
                                <div className='font-bold text-xl text-yellow-300'>100+</div>
                                <div>Expert Doctors</div>
                            </div>
                            <div className='text-center'>
                                <div className='font-bold text-xl text-yellow-300'>50k+</div>
                                <div>Happy Patients</div>
                            </div>
                            <div className='text-center'>
                                <div className='font-bold text-xl text-yellow-300'>24/7</div>
                                <div>Support</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
                            <button 
                                onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                                className='group flex items-center justify-center gap-3 bg-white hover:bg-yellow-50 text-gray-800 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl'
                            >
                                <span>Create Account</span>
                                <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform'>
                                    <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                                    </svg>
                                </div>
                            </button>

                            <button 
                                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                                className='group flex items-center justify-center gap-3 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10'
                            >
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                                </svg>
                                <span>Browse Doctors</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ------- Right Side ------- */}
                <div className='hidden lg:block lg:w-1/2 relative'>
                    <div className='relative'>
                        {/* Decorative background */}
                        <div className='absolute -inset-4 bg-white/10 rounded-3xl blur-2xl'></div>
                        
                        {/* Image container */}
                        <div className='relative bg-white/5 backdrop-blur-sm rounded-2xl p-6'>
                            <img 
                                className='w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                                src={assets.appointment_img} 
                                alt="Medical appointment" 
                            />
                            
                            {/* Floating notification */}
                            <div className='absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce'>
                                <div className='flex items-center gap-2 text-sm font-semibold'>
                                    <div className='w-2 h-2 bg-white rounded-full'></div>
                                    <span>Book Now</span>
                                </div>
                            </div>

                            {/* Rating card */}
                            <div className='absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl'>
                                <div className='flex items-center gap-2'>
                                    <div className='flex text-yellow-400 text-sm'>
                                        {'★'.repeat(5)}
                                    </div>
                                    <span className='text-gray-700 font-semibold text-sm'>4.9</span>
                                </div>
                                <p className='text-gray-600 text-xs mt-1'>Excellent Service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner