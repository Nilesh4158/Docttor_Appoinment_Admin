import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='space-y-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Dashboard Overview</h1>
        <p className='text-gray-600'>Welcome to your admin dashboard. Here's what's happening today.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Doctors Card */}
        <div className='group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
              <img className='w-8 h-8 filter brightness-0 invert' src={assets.doctor_icon} alt="" />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-bold text-blue-600 mb-1'>{dashData.doctors}</p>
              <p className='text-gray-500 font-medium'>Total Doctors</p>
            </div>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/4'></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>+12% from last month</p>
        </div>

        {/* Appointments Card */}
        <div className='group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-green-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
              <img className='w-8 h-8 filter brightness-0 invert' src={assets.appointments_icon} alt="" />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-bold text-green-600 mb-1'>{dashData.appointments}</p>
              <p className='text-gray-500 font-medium'>Appointments</p>
            </div>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-5/6'></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>+8% from last month</p>
        </div>

        {/* Patients Card */}
        <div className='group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-purple-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
              <img className='w-8 h-8 filter brightness-0 invert' src={assets.patients_icon} alt="" />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-bold text-purple-600 mb-1'>{dashData.patients}</p>
              <p className='text-gray-500 font-medium'>Total Patients</p>
            </div>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-2/3'></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>+15% from last month</p>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden'>
        <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg'>
              <img className='w-5 h-5 filter brightness-0 invert' src={assets.list_icon} alt="" />
            </div>
            <h2 className='text-xl font-bold text-gray-800'>Latest Bookings</h2>
            <span className='bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full'>
              {dashData.latestAppointments.length} Recent
            </span>
          </div>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group' key={index}>
              <div className='flex-shrink-0 mr-4'>
                <img className='rounded-full w-12 h-12 border-2 border-gray-200 group-hover:border-indigo-300 transition-colors' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-lg font-semibold text-gray-800 truncate'>{item.docData.name}</p>
                <p className='text-sm text-gray-600'>
                  <span className='inline-flex items-center'>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Booking on {slotDateFormat(item.slotDate)}
                  </span>
                </p>
              </div>
              <div className='flex-shrink-0'>
                {item.cancelled ? (
                  <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200'
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard