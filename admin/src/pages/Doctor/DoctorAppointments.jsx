import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [selectedPatient, setSelectedPatient] = useState(null)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> 
              <div>
                <p 
                  className='text-blue-600 hover:text-blue-800 cursor-pointer font-medium'
                  onClick={() => setSelectedPatient(item.userData)}
                >
                  {item.userData.name}
                </p>
                {item.userData.bloodGroup && (
                  <p className='text-xs text-red-600 font-medium'>Blood: {item.userData.bloodGroup}</p>
                )}
              </div>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
            }
          </div>
        ))}
      </div>

      {/* Patient Health Details Modal */}
      {selectedPatient && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              {/* Header */}
              <div className='flex items-center justify-between mb-6 border-b border-gray-200 pb-4'>
                <div className='flex items-center space-x-4'>
                  <img
                    className='h-16 w-16 rounded-full object-cover border-2 border-gray-200'
                    src={selectedPatient.image}
                    alt={selectedPatient.name}
                  />
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900'>{selectedPatient.name}</h2>
                    <p className='text-gray-600'>Patient ID: {selectedPatient._id?.slice(-8)}</p>
                    <p className='text-blue-600 font-medium'>{selectedPatient.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>

              {/* Quick Health Summary */}
              <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
                <h3 className='text-lg font-semibold text-red-800 mb-3'>🚨 Critical Health Information</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                  <div>
                    <label className='block font-medium text-gray-700'>Blood Group</label>
                    <p className='text-red-600 font-bold text-lg'>{selectedPatient.bloodGroup || 'Unknown'}</p>
                  </div>
                  <div>
                    <label className='block font-medium text-gray-700'>Age</label>
                    <p className='text-gray-900 font-medium'>{calculateAge(selectedPatient.dob)} years</p>
                  </div>
                  <div>
                    <label className='block font-medium text-gray-700'>Allergies</label>
                    <p className='text-orange-600 font-medium'>{selectedPatient.allergies || 'None reported'}</p>
                  </div>
                  <div>
                    <label className='block font-medium text-gray-700'>Emergency Contact</label>
                    <p className='text-gray-900'>{selectedPatient.emergencyContact?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                
                {/* Contact Information */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    📞 Contact Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Phone</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Address</label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedPatient.address && selectedPatient.address.line1 
                          ? `${selectedPatient.address.line1}${selectedPatient.address.line2 ? `, ${selectedPatient.address.line2}` : ''}`
                          : 'Not provided'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Physical Information */}
                <div className='bg-blue-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    📏 Physical Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Height</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.height || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Weight</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.weight || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Gender</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Information */}
                <div className='bg-green-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    🏃‍♂️ Lifestyle Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Smoking Status</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.smokingStatus || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Drinking Status</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.drinkingStatus || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Exercise Frequency</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.exerciseFrequency || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className='bg-purple-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    👤 Personal Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Occupation</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.occupation || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.maritalStatus || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Width Sections */}
              <div className='mt-6 space-y-6'>
                
                {/* Medical History */}
                <div className='bg-yellow-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    📋 Medical History & Medications
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Medical History</label>
                      <div className='bg-white p-3 rounded border min-h-[80px]'>
                        <p className='text-sm text-gray-900 whitespace-pre-wrap'>
                          {selectedPatient.medicalHistory || 'No medical history recorded'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Current Medications</label>
                      <div className='bg-white p-3 rounded border min-h-[80px]'>
                        <p className='text-sm text-gray-900 whitespace-pre-wrap'>
                          {selectedPatient.currentMedications || 'No current medications'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Chronic Conditions</label>
                    <div className='bg-white p-3 rounded border'>
                      <p className='text-sm text-gray-900 whitespace-pre-wrap'>
                        {selectedPatient.chronicConditions || 'No chronic conditions reported'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className='bg-red-100 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    🚨 Emergency Contact
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Name</label>
                      <p className='mt-1 text-sm text-gray-900 font-medium'>
                        {selectedPatient.emergencyContact?.name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Phone</label>
                      <p className='mt-1 text-sm text-gray-900 font-medium'>
                        {selectedPatient.emergencyContact?.phone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Relationship</label>
                      <p className='mt-1 text-sm text-gray-900 font-medium'>
                        {selectedPatient.emergencyContact?.relationship || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className='flex justify-end mt-8 pt-4 border-t border-gray-200'>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium'
                >
                  Close Patient Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DoctorAppointments