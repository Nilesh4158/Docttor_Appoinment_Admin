import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='relative py-20 bg-white overflow-hidden'>
            {/* Background decorations */}
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-40 blur-3xl'></div>
            <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-40 blur-3xl'></div>
            
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className='text-center space-y-4 mb-12'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-6 py-3 rounded-full'>
                        <svg className='w-5 h-5 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                        </svg>
                        <span className='text-primary font-semibold'>Featured Doctors</span>
                    </div>
                    
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent'>
                        Top Doctors to Book
                    </h1>
                    
                    <p className='max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed'>
                        Meet our experienced medical professionals. Each doctor is carefully selected for their expertise, 
                        dedication, and commitment to patient care.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {doctors.slice(0, 10).map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                            className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:scale-105' 
                            key={index}
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden'>
                                <div className='aspect-w-4 aspect-h-3 bg-gradient-to-br from-blue-50 to-purple-50'>
                                    <img 
                                        className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500' 
                                        src={item.image} 
                                        alt={item.name}
                                    />
                                </div>
                                
                                {/* Availability badge */}
                                <div className='absolute top-4 right-4'>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                                        item.available 
                                            ? 'bg-green-100/90 text-green-700 border border-green-200' 
                                            : 'bg-red-100/90 text-red-700 border border-red-200'
                                    }`}>
                                        <div className={`w-2 h-2 rounded-full ${
                                            item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                        }`}></div>
                                        <span>{item.available ? 'Available' : 'Busy'}</span>
                                    </div>
                                </div>

                                {/* Overlay gradient */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </div>

                            {/* Content */}
                            <div className='p-6 space-y-3'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300'>
                                        {item.name}
                                    </h3>
                                    <p className='text-gray-600 font-medium'>
                                        {item.speciality}
                                    </p>
                                </div>

                                {/* Rating and experience */}
                                <div className='flex items-center justify-between pt-2'>
                                    <div className='flex items-center gap-1'>
                                        <div className='flex text-yellow-400 text-sm'>
                                            {'★'.repeat(5)}
                                        </div>
                                        <span className='text-gray-500 text-sm ml-1'>(4.9)</span>
                                    </div>
                                    <span className='text-primary font-semibold text-sm'>
                                        10+ years exp.
                                    </span>
                                </div>

                                {/* Action button */}
                                <button className='w-full mt-4 py-3 px-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:from-primary/90 hover:to-purple-600/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100'>
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className='text-center mt-16'>
                    <button 
                        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                        className='group inline-flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary hover:to-purple-600 text-gray-700 hover:text-white font-semibold px-8 py-4 rounded-full border border-gray-200 hover:border-transparent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    >
                        <span>View All Doctors</span>
                        <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopDoctors