import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors, getDoctorStats, backendUrl } = useContext(AdminContext)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [viewMode, setViewMode] = useState('gallery') // 'gallery' or 'stats'
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' })

  useEffect(() => {
    if (aToken) {
      if (viewMode === 'stats') {
        getDoctorStats()
      } else {
        getAllDoctors()
      }
    }
  }, [aToken, viewMode, getAllDoctors, getDoctorStats])

  const openDoctorPanel = (doctor) => {
    setSelectedDoctor(doctor)
    setEditData(doctor)
    setIsPanelOpen(true)
    setIsEditMode(false)
  }

  const closeDoctorPanel = () => {
    setIsPanelOpen(false)
    setSelectedDoctor(null)
    setIsEditMode(false)
    setEditData({})
  }

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
    setShowPasswordChange(false)
    setPasswordData({ newPassword: '', confirmPassword: '' })
    if (!isEditMode) {
      setEditData(selectedDoctor)
    }
  }

  const handlePasswordChange = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-doctor-password',
        {
          doctorId: selectedDoctor._id,
          newPassword: passwordData.newPassword
        },
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success('Password changed successfully')
        setShowPasswordChange(false)
        setPasswordData({ newPassword: '', confirmPassword: '' })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to change password')
      console.error(error)
    }
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/edit-doctor`, 
        {
          doctorId: editData._id,
          ...editData
        }, 
        { headers: { aToken } }
      )
      
      if (response.data.success) {
        toast.success('Doctor updated successfully!')
        getAllDoctors()
        setSelectedDoctor(editData)
        setIsEditMode(false)
      } else {
        toast.error('Failed to update doctor')
      }
    } catch (error) {
      toast.error('Error updating doctor')
    }
  }

  return (
    <div className='flex h-[calc(100vh-100px)] bg-gray-50'>
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isPanelOpen ? 'w-2/3' : 'w-full'} p-6`}>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
              Doctors Management
            </h1>
            <p className='text-gray-600 text-lg'>Click on any doctor to view detailed information</p>
          </div>
          <div className='flex items-center gap-4'>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'gallery'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'stats'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Statistics
              </button>
            </div>
            <div className='bg-white rounded-full px-6 py-3 shadow-lg border'>
              <span className='text-2xl font-bold text-gray-800'>{doctors.length}</span>
              <span className='text-gray-500 ml-2'>Total Doctors</span>
            </div>
          </div>
        </div>

        {viewMode === 'gallery' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
            {doctors.map((doctor) => (
              <div 
                key={doctor._id}
                onClick={() => openDoctorPanel(doctor)}
                className='group cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 overflow-hidden'
              >
                {/* Image Section */}
                <div className='relative h-48 overflow-hidden'>
                  <img 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                    src={doctor.image} 
                    alt={doctor.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                    doctor.available ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>

                  {/* Click Indicator */}
                  <div className='absolute bottom-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0'>
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 truncate'>
                    Dr. {doctor.name}
                  </h3>
                  
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'>
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {doctor.speciality}
                    </span>
                  </div>

                  <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                    <div className='text-sm text-gray-600'>
                      <span className='font-semibold'>₹{doctor.fees}</span> consultation
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        changeAvailability(doctor._id);
                      }}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
                        doctor.available ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        doctor.available ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Statistics View
          <div className="w-full grid gap-6 lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-gradient-to-br from-white to-blue-50 p-6 border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group"
                onClick={() => openDoctorPanel(doctor)}
              >
                {/* Doctor Header */}
                <div className="flex items-center mb-6">
                  <img 
                    className="w-16 h-16 object-cover rounded-full border-3 shadow-lg" 
                    src={doctor.image} 
                    alt={doctor.name} 
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      Dr. {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{doctor.speciality}</p>
                    <p className="text-xs text-gray-500">₹{doctor.fees} consultation</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'} shadow-lg`}></div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-700">
                          ₹{doctor.totalEarnings || 0}
                        </p>
                        <p className="text-xs text-green-600 font-medium">Total Earnings</p>
                      </div>
                      <div className="p-2 bg-green-200 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-700">
                          {doctor.totalAppointments || 0}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">Total Appointments</p>
                      </div>
                      <div className="p-2 bg-blue-200 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-purple-700">
                          {doctor.completedAppointments || 0}
                        </p>
                        <p className="text-xs text-purple-600 font-medium">Completed</p>
                      </div>
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-orange-700">
                          {doctor.cancelledAppointments || 0}
                        </p>
                        <p className="text-xs text-orange-600 font-medium">Cancelled</p>
                      </div>
                      <div className="p-2 bg-orange-200 rounded-lg">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium text-gray-600">Completion Rate</p>
                    <p className="text-xs font-bold text-gray-800">
                      {doctor.totalAppointments > 0 
                        ? `${Math.round((doctor.completedAppointments / doctor.totalAppointments) * 100)}%`
                        : '0%'
                      }
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: doctor.totalAppointments > 0 
                          ? `${(doctor.completedAppointments / doctor.totalAppointments) * 100}%`
                          : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {doctors.length === 0 && (
          <div className='flex flex-col items-center justify-center h-96 text-center'>
            <div className='w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6'>
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Doctors Found</h3>
            <p className='text-gray-600 text-lg'>Add some doctors to get started with your medical team.</p>
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-500 transform z-50 ${
        isPanelOpen ? 'translate-x-0 w-1/3' : 'translate-x-full w-0'
      } min-w-96`}>
        {selectedDoctor && (
          <div className='h-full flex flex-col'>
            {/* Panel Header */}
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative'>
              <button
                onClick={closeDoctorPanel}
                className='absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className='text-2xl font-bold mb-2'>Doctor Profile</h2>
              <p className='text-white/90'>Detailed information and settings</p>
            </div>

            {/* Panel Content */}
            <div className='flex-1 overflow-y-auto p-6'>
              {/* Doctor Image */}
              <div className='text-center mb-8'>
                <img 
                  className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-xl' 
                  src={isEditMode ? editData.image : selectedDoctor.image} 
                  alt={isEditMode ? editData.name : selectedDoctor.name}
                />
                {isEditMode && (
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Image URL</label>
                    <input
                      type="text"
                      value={editData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                )}
              </div>

              {/* Doctor Details */}
              <div className='space-y-6'>
                {/* Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium'
                    />
                  ) : (
                    <p className='text-2xl font-bold text-gray-800'>Dr. {selectedDoctor.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                  {isEditMode ? (
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-600 bg-gray-50 px-4 py-3 rounded-lg'>{selectedDoctor.email}</p>
                  )}
                </div>

                {/* Speciality */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Speciality</label>
                  {isEditMode ? (
                    <select
                      value={editData.speciality || ''}
                      onChange={(e) => handleInputChange('speciality', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value="General physician">General physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatricians</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  ) : (
                    <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      {selectedDoctor.speciality}
                    </span>
                  )}
                </div>

                {/* Degree */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Degree</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.degree || ''}
                      onChange={(e) => handleInputChange('degree', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-600 bg-gray-50 px-4 py-3 rounded-lg'>{selectedDoctor.degree}</p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Experience</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.experience || ''}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-600 bg-gray-50 px-4 py-3 rounded-lg'>{selectedDoctor.experience}</p>
                  )}
                </div>

                {/* Fees */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Consultation Fees</label>
                  {isEditMode ? (
                    <input
                      type="number"
                      value={editData.fees || ''}
                      onChange={(e) => handleInputChange('fees', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-2xl font-bold text-green-600'>₹{selectedDoctor.fees}</p>
                  )}
                </div>

                {/* About */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>About</label>
                  {isEditMode ? (
                    <textarea
                      value={editData.about || ''}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                      rows={4}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-600 bg-gray-50 px-4 py-3 rounded-lg leading-relaxed'>{selectedDoctor.about}</p>
                  )}
                </div>

                {/* Password Section - Only in Edit Mode */}
                {isEditMode && (
                  <div className='border-2 border-dashed border-orange-200 rounded-lg p-4 bg-orange-50'>
                    <div className='flex items-center justify-between mb-4'>
                      <label className='block text-sm font-medium text-orange-700'>Change Password</label>
                      <button
                        type="button"
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                        className='text-orange-600 hover:text-orange-700 font-medium text-sm'
                      >
                        {showPasswordChange ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>
                    
                    {showPasswordChange && (
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-xs font-medium text-gray-600 mb-1'>New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                            placeholder='Enter new password'
                          />
                        </div>
                        <div>
                          <label className='block text-xs font-medium text-gray-600 mb-1'>Confirm Password</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                            placeholder='Confirm new password'
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handlePasswordChange}
                          className='w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300'
                        >
                          Update Password
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Address */}
                {selectedDoctor.address && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                    <div className='bg-gray-50 px-4 py-3 rounded-lg'>
                      <p className='text-gray-600'>{selectedDoctor.address.line1}</p>
                      {selectedDoctor.address.line2 && <p className='text-gray-600'>{selectedDoctor.address.line2}</p>}
                    </div>
                  </div>
                )}

                {/* Availability Status */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Availability Status</label>
                  <div className='flex items-center gap-4'>
                    <button 
                      onClick={() => changeAvailability(selectedDoctor._id)}
                      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors focus:outline-none ${
                        selectedDoctor.available ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                        selectedDoctor.available ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className={`text-sm font-medium ${selectedDoctor.available ? 'text-green-600' : 'text-gray-500'}`}>
                      {selectedDoctor.available ? 'Available for consultations' : 'Currently unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className='border-t border-gray-200 p-6 bg-gray-50'>
              <div className='flex gap-3'>
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className='flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105'
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className='flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-all duration-300'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105'
                  >
                    Edit Doctor
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isPanelOpen && (
        <div 
          className='fixed inset-0 bg-black/20 z-40 backdrop-blur-sm'
          onClick={closeDoctorPanel}
        ></div>
      )}
    </div>
  )
}

export default DoctorsList