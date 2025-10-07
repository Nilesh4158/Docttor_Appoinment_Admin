import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file)
        }
    }

    const updateProfile = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            
            // Add profile data
            formData.append('address', JSON.stringify(profileData.address))
            formData.append('fees', profileData.fees)
            formData.append('about', profileData.about)
            formData.append('available', profileData.available)
            formData.append('phone', profileData.phone || '')
            formData.append('specialization', profileData.specialization || '')
            formData.append('languages', JSON.stringify(profileData.languages || []))
            formData.append('education', JSON.stringify(profileData.education || []))
            formData.append('awards', JSON.stringify(profileData.awards || []))
            
            // Add image if selected
            if (profileImage) {
                formData.append('image', profileImage)
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', formData, { 
                headers: { 
                    dToken,
                    'Content-Type': 'multipart/form-data'
                } 
            })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                setProfileImage(null)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
        setLoading(false)
    }

    const handlePasswordChange = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill all password fields')
            return
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match')
            return
        }
        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/change-password', passwordData, { headers: { dToken } })
            
            if (data.success) {
                toast.success('Password changed successfully')
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Failed to change password')
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken, getProfileData])

    return profileData && (
        <div className='w-full h-full p-6 bg-gradient-to-br from-gray-50 to-blue-50'>
            {/* Header */}
            <div className='mb-8 flex justify-between items-center'>
                <div>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                        My Profile
                    </h1>
                    <p className='text-gray-600 text-lg'>Manage your professional information and settings</p>
                </div>
                {!isEdit ? (
                    <button 
                        onClick={() => setIsEdit(true)}
                        className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className='flex gap-3'>
                        <button 
                            onClick={() => {
                                setIsEdit(false)
                                setProfileImage(null)
                                getProfileData()
                            }}
                            className='px-4 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300'
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={updateProfile}
                            disabled={loading}
                            className='px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50'
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </div>

            {/* Tab Navigation */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6'>
                <div className='flex border-b border-gray-200'>
                    {['profile', 'security'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                        >
                            {tab === 'profile' && '👨‍⚕️ Profile Information'}
                            {tab === 'security' && '🔐 Security Settings'}
                        </button>
                    ))}
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className='p-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Left Column - Profile Image */}
                            <div className='lg:col-span-1'>
                                <div className='text-center'>
                                    <div className='relative inline-block'>
                                        <img 
                                            className='w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl mx-auto' 
                                            src={profileImage ? URL.createObjectURL(profileImage) : profileData.image} 
                                            alt="Profile" 
                                        />
                                        {isEdit && (
                                            <label className='absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-300 shadow-lg'>
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    onChange={handleImageChange}
                                                    className='hidden'
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <h2 className='text-3xl font-bold text-gray-800 mt-4'>Dr. {profileData.name}</h2>
                                    <div className='flex flex-col items-center mt-2 space-y-2'>
                                        <span className='bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold'>
                                            {profileData.speciality}
                                        </span>
                                        <div className='flex items-center gap-2'>
                                            <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'>
                                                {profileData.experience}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                profileData.available 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {profileData.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className='mt-8 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl'>
                                    <h3 className='text-lg font-bold text-gray-800 mb-4'>Quick Stats</h3>
                                    <div className='space-y-3'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Consultation Fee</span>
                                            <span className='font-bold text-green-600'>{currency} {profileData.fees}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Degree</span>
                                            <span className='font-semibold text-gray-800'>{profileData.degree}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Experience</span>
                                            <span className='font-semibold text-gray-800'>{profileData.experience}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Profile Details */}
                            <div className='lg:col-span-2'>
                                <div className='space-y-8'>
                                    {/* Basic Information */}
                                    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                                        <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Basic Information
                                        </h3>
                                        
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                                                <input 
                                                    type="email" 
                                                    value={profileData.email} 
                                                    disabled
                                                    className='w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500'
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number</label>
                                                {isEdit ? (
                                                    <input 
                                                        type="tel" 
                                                        value={profileData.phone || ''} 
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                        placeholder='+1 (555) 123-4567'
                                                    />
                                                ) : (
                                                    <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50'>
                                                        {profileData.phone || 'Not provided'}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Consultation Fee ({currency})</label>
                                                {isEdit ? (
                                                    <input 
                                                        type="number" 
                                                        value={profileData.fees} 
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                    />
                                                ) : (
                                                    <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-green-600'>
                                                        {currency} {profileData.fees}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Specialization</label>
                                                {isEdit ? (
                                                    <input 
                                                        type="text" 
                                                        value={profileData.specialization || profileData.speciality} 
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                        placeholder='e.g., Cardiology, Internal Medicine'
                                                    />
                                                ) : (
                                                    <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50'>
                                                        {profileData.specialization || profileData.speciality}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                                        <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Clinic Address
                                        </h3>
                                        
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 1</label>
                                                {isEdit ? (
                                                    <input 
                                                        type="text" 
                                                        value={profileData.address.line1} 
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                    />
                                                ) : (
                                                    <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50'>
                                                        {profileData.address.line1}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 2</label>
                                                {isEdit ? (
                                                    <input 
                                                        type="text" 
                                                        value={profileData.address.line2} 
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                    />
                                                ) : (
                                                    <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50'>
                                                        {profileData.address.line2}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* About Section */}
                                    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                                        <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Professional Bio
                                        </h3>
                                        
                                        {isEdit ? (
                                            <textarea 
                                                value={profileData.about} 
                                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                                rows={6}
                                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                placeholder='Tell patients about your experience, approach to care, and specialties...'
                                            />
                                        ) : (
                                            <div className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 leading-relaxed'>
                                                {profileData.about}
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability Toggle */}
                                    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                                        <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Availability Status
                                        </h3>
                                        
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-gray-700 font-medium'>Accept New Appointments</p>
                                                <p className='text-gray-500 text-sm'>Toggle to control whether patients can book appointments with you</p>
                                            </div>
                                            <button 
                                                onClick={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                                disabled={!isEdit}
                                                className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors focus:outline-none ${
                                                    profileData.available ? 'bg-green-500' : 'bg-gray-300'
                                                } ${!isEdit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <span className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                                                    profileData.available ? 'translate-x-7' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className='p-8'>
                        <div className='max-w-2xl mx-auto'>
                            <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                                <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Change Password
                                </h3>
                                
                                <div className='space-y-6'>
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Current Password</label>
                                        <input 
                                            type="password" 
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            placeholder='Enter current password'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>New Password</label>
                                        <input 
                                            type="password" 
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            placeholder='Enter new password'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            placeholder='Confirm new password'
                                        />
                                    </div>

                                    <button 
                                        onClick={handlePasswordChange}
                                        className='w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default DoctorProfile