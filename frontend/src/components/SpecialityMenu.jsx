import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl'></div>
            <div className='absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-3xl'></div>
            
            <div className='relative flex flex-col items-center gap-6 text-gray-800 max-w-6xl mx-auto px-4'>
                {/* Header Section */}
                <div className='text-center space-y-4 mb-8'>
                    <div className='inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full'>
                        <div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
                        <span className='text-primary font-medium text-sm'>Medical Specialties</span>
                    </div>
                    
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent'>
                        Find by Speciality
                    </h1>
                    
                    <p className='max-w-2xl text-gray-600 text-lg leading-relaxed mx-auto'>
                        Discover our comprehensive range of medical specialties. Each department is staffed with 
                        experienced professionals dedicated to providing exceptional healthcare.
                    </p>
                </div>

                {/* Speciality Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full'>
                    {specialityData.map((item, index) => (
                        <Link 
                            to={`/doctors/${item.speciality}`} 
                            onClick={() => scrollTo(0, 0)} 
                            className='group flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-primary/30 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10' 
                            key={index}
                        >
                            {/* Icon Container */}
                            <div className='relative mb-4'>
                                <div className='w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all duration-300'>
                                    <img 
                                        className='w-12 h-12 group-hover:scale-110 transition-transform duration-300' 
                                        src={item.image} 
                                        alt={item.speciality} 
                                    />
                                </div>
                                
                                {/* Floating indicator */}
                                <div className='absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
                                    <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Text */}
                            <p className='text-gray-700 font-medium text-center group-hover:text-primary transition-colors duration-300 text-sm leading-tight'>
                                {item.speciality}
                            </p>
                            
                            {/* Hover overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </Link>
                    ))}
                </div>

                {/* Call to Action */}
                <div className='mt-12 text-center'>
                    <div className='inline-flex items-center gap-2 text-gray-600'>
                        <span>Can&apos;t find what you&apos;re looking for?</span>
                        <Link to='/doctors' className='text-primary hover:text-purple-600 font-medium hover:underline transition-colors'>
                            View all doctors
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu