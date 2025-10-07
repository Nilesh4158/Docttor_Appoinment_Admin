import { useEffect, useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, completeAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  // Filter appointments based on status and search term
  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = item.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && item.isCompleted) ||
                         (filterStatus === 'cancelled' && item.cancelled) ||
                         (filterStatus === 'pending' && !item.isCompleted && !item.cancelled)
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (item) => {
    if (item.cancelled) return 'bg-red-100 text-red-700 border-red-200'
    if (item.isCompleted) return 'bg-green-100 text-green-700 border-green-200'
    return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }

  const getStatusText = (item) => {
    if (item.cancelled) return 'Cancelled'
    if (item.isCompleted) return 'Completed'
    return 'Pending'
  }

  return (
    <div className='w-full h-full p-6 bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
              Appointments Management
            </h1>
            <p className='text-gray-600 text-lg'>Monitor and manage all patient appointments</p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* Search Bar */}
            <div className='relative'>
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients or doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-3 w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'
              />
            </div>
            
            {/* Filter Buttons */}
            <div className='bg-white rounded-xl p-1 shadow-lg border border-gray-100'>
              {['all', 'pending', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
          <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-2xl font-bold text-blue-700'>{appointments.length}</p>
                <p className='text-sm text-blue-600 font-medium'>Total Appointments</p>
              </div>
              <div className='p-3 bg-blue-200 rounded-xl'>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-2xl font-bold text-green-700'>{appointments.filter(a => a.isCompleted).length}</p>
                <p className='text-sm text-green-600 font-medium'>Completed</p>
              </div>
              <div className='p-3 bg-green-200 rounded-xl'>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl border border-yellow-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-2xl font-bold text-yellow-700'>{appointments.filter(a => !a.isCompleted && !a.cancelled).length}</p>
                <p className='text-sm text-yellow-600 font-medium'>Pending</p>
              </div>
              <div className='p-3 bg-yellow-200 rounded-xl'>
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl border border-red-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-2xl font-bold text-red-700'>{appointments.filter(a => a.cancelled).length}</p>
                <p className='text-sm text-red-600 font-medium'>Cancelled</p>
              </div>
              <div className='p-3 bg-red-200 rounded-xl'>
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
        <div className='p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200'>
          <h3 className='text-xl font-bold text-gray-800'>
            Appointments List 
            <span className='ml-2 text-sm font-normal text-gray-600'>({filteredAppointments.length} appointments)</span>
          </h3>
        </div>

        <div className='overflow-x-auto'>
          <div className='min-w-full'>
            {/* Table Header */}
            <div className='hidden lg:grid lg:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700'>
              <div>#</div>
              <div>Patient</div>
              <div>Age</div>
              <div>Date & Time</div>
              <div>Doctor</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {/* Table Body */}
            <div className='max-h-[60vh] overflow-y-auto'>
              {filteredAppointments.map((item, index) => (
                <div key={item._id} className='lg:grid lg:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr_1fr] gap-4 items-center py-4 px-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group'>
                  
                  {/* Mobile Card Layout */}
                  <div className='lg:hidden bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <img src={item.userData.image} className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md' alt="" />
                        <div>
                          <p className='font-semibold text-gray-800'>{item.userData.name}</p>
                          <p className='text-sm text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item)}`}>
                        {getStatusText(item)}
                      </span>
                    </div>
                    
                    <div className='flex items-center gap-3 mb-3'>
                      <img src={item.docData.image} className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm' alt="" />
                      <div>
                        <p className='font-medium text-gray-800'>Dr. {item.docData.name}</p>
                        <p className='text-sm text-gray-500'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                      <p className='font-bold text-green-600'>{currency}{item.amount}</p>
                      {!item.cancelled && !item.isCompleted && (
                        <div className='flex gap-2'>
                          <button 
                            onClick={() => completeAppointment(item._id)}
                            className='px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm font-medium'
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => cancelAppointment(item._id)}
                            className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm font-medium'
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop Row Layout */}
                  <div className='hidden lg:contents'>
                    <div className='text-gray-500 font-medium'>{index + 1}</div>
                    
                    <div className='flex items-center gap-3'>
                      <img src={item.userData.image} className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:border-blue-300 transition-all duration-300' alt="" />
                      <div>
                        <p className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>{item.userData.name}</p>
                        <p className='text-sm text-gray-500'>{item.userData.email || 'No email'}</p>
                      </div>
                    </div>
                    
                    <div className='text-gray-600 font-medium'>{calculateAge(item.userData.dob)}</div>
                    
                    <div className='text-gray-700'>
                      <p className='font-medium'>{slotDateFormat(item.slotDate)}</p>
                      <p className='text-sm text-gray-500'>{item.slotTime}</p>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                      <img src={item.docData.image} className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:border-purple-300 transition-all duration-300' alt="" />
                      <div>
                        <p className='font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300'>Dr. {item.docData.name}</p>
                        <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
                      </div>
                    </div>
                    
                    <div className='font-bold text-green-600 text-lg'>{currency}{item.amount}</div>
                    
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item)}`}>
                        {getStatusText(item)}
                      </span>
                    </div>
                    
                    <div>
                      {!item.cancelled && !item.isCompleted ? (
                        <div className='flex gap-2'>
                          <button 
                            onClick={() => completeAppointment(item._id)}
                            className='px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => cancelAppointment(item._id)}
                            className='px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className='text-gray-400 text-sm'>No action</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <div className='w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6'>
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Appointments Found</h3>
                <p className='text-gray-600 text-lg'>No appointments match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments