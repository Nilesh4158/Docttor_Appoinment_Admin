import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const [selectedTimeframe, setSelectedTimeframe] = useState('today')

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getStatusIcon = (item) => {
    if (item.cancelled) {
      return (
        <div className='px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold border border-red-200'>
          Cancelled
        </div>
      )
    }
    if (item.isCompleted) {
      return (
        <div className='px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold border border-green-200'>
          Completed
        </div>
      )
    }
    return (
      <div className='flex gap-2'>
        <button 
          onClick={() => cancelAppointment(item._id)}
          className='p-2 hover:bg-red-100 rounded-full transition-colors duration-200 group'
          title="Cancel Appointment"
        >
          <svg className="w-5 h-5 text-red-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button 
          onClick={() => completeAppointment(item._id)}
          className='p-2 hover:bg-green-100 rounded-full transition-colors duration-200 group'
          title="Complete Appointment"
        >
          <svg className="w-5 h-5 text-green-500 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    )
  }

  return dashData && (
    <div className='w-full h-full p-6 bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
              {getGreeting()}, Doctor! 👋
            </h1>
            <p className='text-gray-600 text-lg'>Here's what's happening with your practice today</p>
          </div>
          
          <div className='flex items-center gap-4'>
            <div className='bg-white rounded-xl p-1 shadow-lg border border-gray-100'>
              {['today', 'week', 'month'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                    selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 group cursor-pointer'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-3xl font-bold text-green-700 mb-1'>{currency} {dashData.earnings}</p>
              <p className='text-green-600 font-semibold'>Total Earnings</p>
              <p className='text-green-500 text-sm mt-1'>↗ +12% from last month</p>
            </div>
            <div className='p-4 bg-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 group cursor-pointer'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-3xl font-bold text-blue-700 mb-1'>{dashData.appointments}</p>
              <p className='text-blue-600 font-semibold'>Appointments</p>
              <p className='text-blue-500 text-sm mt-1'>📅 {dashData.appointments > 0 ? 'Active schedule' : 'Free day'}</p>
            </div>
            <div className='p-4 bg-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 group cursor-pointer'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-3xl font-bold text-purple-700 mb-1'>{dashData.patients}</p>
              <p className='text-purple-600 font-semibold'>Patients</p>
              <p className='text-purple-500 text-sm mt-1'>👥 Total unique patients</p>
            </div>
            <div className='p-4 bg-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden'>
        <div className='bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-xl'>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-800'>Latest Bookings</h3>
                <p className='text-gray-600 text-sm'>Recent appointments requiring attention</p>
              </div>
            </div>
            <div className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
              {dashData.latestAppointments?.length || 0} appointments
            </div>
          </div>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div key={index} className='p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group'>
                <div className='flex items-center gap-4'>
                  <div className='relative'>
                    <img 
                      className='w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg group-hover:border-blue-300 transition-all duration-300' 
                      src={item.userData.image} 
                      alt={item.userData.name} 
                    />
                    <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white'></div>
                  </div>
                  
                  <div className='flex-1'>
                    <h4 className='font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300'>
                      {item.userData.name}
                    </h4>
                    <p className='text-gray-600 font-medium'>
                      📅 {slotDateFormat(item.slotDate)} • ⏰ {item.slotTime}
                    </p>
                    <p className='text-gray-500 text-sm mt-1'>
                      💰 Consultation Fee: {currency}{item.amount}
                    </p>
                  </div>
                  
                  <div className='flex flex-col items-end gap-2'>
                    {getStatusIcon(item)}
                    <span className='text-xs text-gray-400'>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-16 text-center'>
              <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4'>
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>No Recent Appointments</h3>
              <p className='text-gray-600'>You don't have any recent bookings to display.</p>
            </div>
          )}
                </div>
      </div>
    </div>
  )
}

export default DoctorDashboard