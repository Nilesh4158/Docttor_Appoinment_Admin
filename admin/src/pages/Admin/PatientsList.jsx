import { useContext, useEffect, useState, useCallback } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const PatientsList = () => {
  const { aToken, allPatients, changePassword } = useContext(AdminContext)
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const getPatientsData = useCallback(async () => {
    try {
      const data = await allPatients()
      if (data.success) {
        setPatients(data.patients)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [allPatients])

  const handlePasswordChange = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      const data = await changePassword(selectedPatient._id, newPassword, 'patient')
      if (data.success) {
        toast.success('Password changed successfully')
        setShowPasswordModal(false)
        setNewPassword('')
        setSelectedPatient(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  useEffect(() => {
    if (aToken) {
      getPatientsData()
    }
  }, [aToken, getPatientsData])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg lg:text-2xl font-medium mb-8'>All Patients</h1>
      
      {/* Search Bar */}
      <div className='mb-6'>
        <div className='relative max-w-md'>
          <input
            type='text'
            placeholder='Search patients by name, email, or phone...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <svg className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </div>
      </div>

      {/* Patients Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 bg-blue-100 rounded-full'>
              <img className='w-6 h-6' src={assets.patients_icon} alt='' />
            </div>
            <div className='ml-4'>
              <p className='text-gray-600 text-sm'>Total Patients</p>
              <p className='text-2xl font-semibold'>{patients.length}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 bg-green-100 rounded-full'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-gray-600 text-sm'>Active Profiles</p>
              <p className='text-2xl font-semibold'>{patients.filter(p => p.phone !== '000000000').length}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 bg-purple-100 rounded-full'>
              <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-gray-600 text-sm'>Filtered Results</p>
              <p className='text-2xl font-semibold'>{filteredPatients.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Patient</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Details</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='h-12 w-12 flex-shrink-0'>
                        <img
                          className='h-12 w-12 rounded-full object-cover border-2 border-gray-200'
                          src={patient.image}
                          alt={patient.name}
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{patient.name}</div>
                        <div className='text-sm text-gray-500'>ID: {patient._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{patient.email}</div>
                    <div className='text-sm text-gray-500'>{patient.phone}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='space-y-1'>
                      <div className='text-sm text-gray-900'>
                        <span className='font-medium'>Gender:</span> {patient.gender}
                      </div>
                      <div className='text-sm text-gray-500'>
                        <span className='font-medium'>DOB:</span> {patient.dob}
                      </div>
                      <div className='text-sm text-red-600 font-medium'>
                        <span className='font-medium text-gray-700'>Blood:</span> {patient.bloodGroup || 'N/A'}
                      </div>
                      {patient.address && patient.address.line1 && (
                        <div className='text-sm text-gray-500'>
                          <span className='font-medium'>Address:</span> {patient.address.line1}
                          {patient.address.line2 && `, ${patient.address.line2}`}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient)
                          setShowPasswordModal(true)
                        }}
                        className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
                      >
                        <svg className='w-3 h-3 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0117 9z' />
                        </svg>
                        Change Password
                      </button>
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className='inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
                      >
                        <svg className='w-3 h-3 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                        </svg>
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPatients.length === 0 && (
        <div className='text-center py-8'>
          <img className='mx-auto h-24 w-24 text-gray-400' src={assets.patients_icon} alt='' />
          <h3 className='mt-2 text-sm font-medium text-gray-900'>No patients found</h3>
          <p className='mt-1 text-sm text-gray-500'>
            {searchTerm ? 'Try adjusting your search criteria.' : 'No patients have been registered yet.'}
          </p>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && selectedPatient && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>Change Password</h3>
                <button
                  onClick={() => {
                    setShowPasswordModal(false)
                    setNewPassword('')
                    setSelectedPatient(null)
                  }}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='mb-4'>
                <p className='text-sm text-gray-600 mb-2'>
                  Changing password for: <span className='font-medium'>{selectedPatient.name}</span>
                </p>
                <p className='text-sm text-gray-500 mb-4'>
                  Email: {selectedPatient.email}
                </p>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  New Password
                </label>
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='Enter new password (min 6 characters)'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  minLength={6}
                />
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  onClick={() => {
                    setShowPasswordModal(false)
                    setNewPassword('')
                    setSelectedPatient(null)
                  }}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200'
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && !showPasswordModal && (
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
                    <p className='text-gray-600'>Patient ID: {selectedPatient._id.slice(-8)}</p>
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

              {/* Content Grid */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                
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

                {/* Basic Information */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    👤 Basic Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Gender</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.dob}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Age</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.age || 'Not provided'}</p>
                    </div>
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

                {/* Health Information */}
                <div className='bg-red-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    🩺 Health Information
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Blood Group</label>
                      <p className='mt-1 text-sm font-bold text-red-600'>{selectedPatient.bloodGroup || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Height</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.height || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Weight</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.weight || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Allergies</label>
                      <p className='mt-1 text-sm text-gray-900'>{selectedPatient.allergies || 'None reported'}</p>
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
              </div>

              {/* Full Width Sections */}
              <div className='mt-8 space-y-6'>
                
                {/* Medical History */}
                <div className='bg-blue-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    📋 Medical History
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
                <div className='bg-yellow-50 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                    🚨 Emergency Contact
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Name</label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedPatient.emergencyContact?.name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Phone</label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedPatient.emergencyContact?.phone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Relationship</label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedPatient.emergencyContact?.relationship || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className='flex justify-between mt-8 pt-4 border-t border-gray-200'>
                <button
                  onClick={() => {
                    setShowPasswordModal(true)
                  }}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200'
                >
                  🔑 Change Password
                </button>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className='px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200 font-medium'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientsList