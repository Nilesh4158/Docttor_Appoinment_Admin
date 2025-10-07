import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            
            // Add new health fields
            formData.append('bloodGroup', userData.bloodGroup || 'Not Selected')
            formData.append('age', userData.age || '')
            formData.append('height', userData.height || '')
            formData.append('weight', userData.weight || '')
            formData.append('medicalHistory', userData.medicalHistory || '')
            formData.append('allergies', userData.allergies || '')
            formData.append('currentMedications', userData.currentMedications || '')
            formData.append('emergencyContact', JSON.stringify(userData.emergencyContact || { name: '', phone: '', relationship: '' }))
            formData.append('occupation', userData.occupation || '')
            formData.append('maritalStatus', userData.maritalStatus || 'Not Selected')
            formData.append('smokingStatus', userData.smokingStatus || 'Not Selected')
            formData.append('drinkingStatus', userData.drinkingStatus || 'Not Selected')
            formData.append('exerciseFrequency', userData.exerciseFrequency || 'Not Selected')
            formData.append('chronicConditions', userData.chronicConditions || '')

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='max-w-4xl mx-auto flex flex-col gap-6 text-sm pt-8 px-4'>

            {/* Profile Header */}
            <div className='bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-sm border border-blue-200'>
                <div className='flex flex-col md:flex-row gap-6 items-start'>
                    {/* Profile Image */}
                    <div className='flex-shrink-0'>
                        {isEdit
                            ? <label htmlFor='image' className='cursor-pointer'>
                                <div className='relative'>
                                    <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' 
                                         src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                    <div className='absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors'>
                                        <img className='w-4 h-4' src={assets.upload_icon} alt="" />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                            : <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' 
                                   src={userData.image} alt="" />
                        }
                    </div>

                    {/* Name and Basic Info */}
                    <div className='flex-grow'>
                        {isEdit
                            ? <input className='bg-white text-2xl font-bold max-w-md px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                     type="text" 
                                     onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                     value={userData.name} />
                            : <h1 className='font-bold text-3xl text-gray-800 mb-2'>{userData.name}</h1>
                        }
                        <p className='text-blue-600 font-medium mb-1'>{userData.email}</p>
                        <p className='text-gray-600'>Patient ID: {userData._id?.slice(-8)}</p>
                    </div>

                    {/* Edit/Save Button */}
                    <div className='flex-shrink-0'>
                        {isEdit
                            ? <button onClick={updateUserProfileData} 
                                      className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium'>
                                Save Changes
                              </button>
                            : <button onClick={() => setIsEdit(true)} 
                                      className='border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium'>
                                Edit Profile
                              </button>
                        }
                    </div>
                </div>
            </div>

            {/* Profile Sections */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                
                {/* Contact Information */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        📞 Contact Information
                    </h2>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Phone:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type="text" 
                                         onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                         value={userData.phone} />
                                : <span className='col-span-2 text-blue-600'>{userData.phone}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-start'>
                            <label className='font-medium text-gray-700'>Address:</label>
                            {isEdit
                                ? <div className='col-span-2 space-y-2'>
                                    <input className='w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                           type="text" 
                                           placeholder="Street Address"
                                           onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                           value={userData.address?.line1 || ''} />
                                    <input className='w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                           type="text" 
                                           placeholder="City, State, ZIP"
                                           onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                           value={userData.address?.line2 || ''} />
                                  </div>
                                : <div className='col-span-2 text-gray-600'>
                                    {userData.address?.line1 && <div>{userData.address.line1}</div>}
                                    {userData.address?.line2 && <div>{userData.address.line2}</div>}
                                    {!userData.address?.line1 && !userData.address?.line2 && <span className='text-gray-400'>Not provided</span>}
                                  </div>
                            }
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        👤 Basic Information
                    </h2>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Gender:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                          value={userData.gender}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                  </select>
                                : <span className='col-span-2 text-gray-600'>{userData.gender}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Birthday:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='date' 
                                         onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                         value={userData.dob} />
                                : <span className='col-span-2 text-gray-600'>{userData.dob}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Age:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='number' 
                                         placeholder="Enter age"
                                         onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))} 
                                         value={userData.age || ''} />
                                : <span className='col-span-2 text-gray-600'>{userData.age || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Occupation:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='text' 
                                         placeholder="Enter occupation"
                                         onChange={(e) => setUserData(prev => ({ ...prev, occupation: e.target.value }))} 
                                         value={userData.occupation || ''} />
                                : <span className='col-span-2 text-gray-600'>{userData.occupation || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Marital Status:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, maritalStatus: e.target.value }))} 
                                          value={userData.maritalStatus || 'Not Selected'}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                  </select>
                                : <span className='col-span-2 text-gray-600'>{userData.maritalStatus || 'Not provided'}</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Health Information */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        🩺 Health Information
                    </h2>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Blood Group:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, bloodGroup: e.target.value }))} 
                                          value={userData.bloodGroup || 'Not Selected'}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                  </select>
                                : <span className='col-span-2 text-red-600 font-medium'>{userData.bloodGroup || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Height:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='text' 
                                         placeholder="e.g., 175 cm or 5'9&quot;"
                                         onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))} 
                                         value={userData.height || ''} />
                                : <span className='col-span-2 text-gray-600'>{userData.height || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Weight:</label>
                            {isEdit
                                ? <input className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='text' 
                                         placeholder="e.g., 70 kg or 154 lbs"
                                         onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))} 
                                         value={userData.weight || ''} />
                                : <span className='col-span-2 text-gray-600'>{userData.weight || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-start'>
                            <label className='font-medium text-gray-700'>Allergies:</label>
                            {isEdit
                                ? <textarea className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none' 
                                           rows="2"
                                           placeholder="List any allergies..."
                                           onChange={(e) => setUserData(prev => ({ ...prev, allergies: e.target.value }))} 
                                           value={userData.allergies || ''} />
                                : <span className='col-span-2 text-gray-600'>{userData.allergies || 'None reported'}</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Lifestyle Information */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        🏃‍♂️ Lifestyle Information
                    </h2>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Smoking:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, smokingStatus: e.target.value }))} 
                                          value={userData.smokingStatus || 'Not Selected'}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Never">Never</option>
                                    <option value="Former">Former</option>
                                    <option value="Current">Current</option>
                                  </select>
                                : <span className='col-span-2 text-gray-600'>{userData.smokingStatus || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Drinking:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, drinkingStatus: e.target.value }))} 
                                          value={userData.drinkingStatus || 'Not Selected'}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Never">Never</option>
                                    <option value="Occasionally">Occasionally</option>
                                    <option value="Regularly">Regularly</option>
                                  </select>
                                : <span className='col-span-2 text-gray-600'>{userData.drinkingStatus || 'Not provided'}</span>
                            }
                        </div>

                        <div className='grid grid-cols-3 gap-2 items-center'>
                            <label className='font-medium text-gray-700'>Exercise:</label>
                            {isEdit
                                ? <select className='col-span-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ ...prev, exerciseFrequency: e.target.value }))} 
                                          value={userData.exerciseFrequency || 'Not Selected'}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Never">Never</option>
                                    <option value="Rarely">Rarely</option>
                                    <option value="Sometimes">Sometimes</option>
                                    <option value="Regularly">Regularly</option>
                                    <option value="Daily">Daily</option>
                                  </select>
                                : <span className='col-span-2 text-gray-600'>{userData.exerciseFrequency || 'Not provided'}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Full width sections */}
            <div className='grid grid-cols-1 gap-6'>
                
                {/* Medical History & Medications */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        📋 Medical History & Medications
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block font-medium text-gray-700 mb-2'>Medical History:</label>
                            {isEdit
                                ? <textarea className='w-full bg-gray-50 px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none' 
                                           rows="4"
                                           placeholder="Previous surgeries, medical conditions, etc..."
                                           onChange={(e) => setUserData(prev => ({ ...prev, medicalHistory: e.target.value }))} 
                                           value={userData.medicalHistory || ''} />
                                : <div className='bg-gray-50 p-3 rounded-lg text-gray-600 min-h-[100px]'>
                                    {userData.medicalHistory || 'No medical history recorded'}
                                  </div>
                            }
                        </div>

                        <div>
                            <label className='block font-medium text-gray-700 mb-2'>Current Medications:</label>
                            {isEdit
                                ? <textarea className='w-full bg-gray-50 px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none' 
                                           rows="4"
                                           placeholder="List current medications and dosages..."
                                           onChange={(e) => setUserData(prev => ({ ...prev, currentMedications: e.target.value }))} 
                                           value={userData.currentMedications || ''} />
                                : <div className='bg-gray-50 p-3 rounded-lg text-gray-600 min-h-[100px]'>
                                    {userData.currentMedications || 'No current medications'}
                                  </div>
                            }
                        </div>
                    </div>

                    <div className='mt-6'>
                        <label className='block font-medium text-gray-700 mb-2'>Chronic Conditions:</label>
                        {isEdit
                            ? <textarea className='w-full bg-gray-50 px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none' 
                                       rows="3"
                                       placeholder="Diabetes, hypertension, asthma, etc..."
                                       onChange={(e) => setUserData(prev => ({ ...prev, chronicConditions: e.target.value }))} 
                                       value={userData.chronicConditions || ''} />
                            : <div className='bg-gray-50 p-3 rounded-lg text-gray-600'>
                                {userData.chronicConditions || 'No chronic conditions reported'}
                              </div>
                        }
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                        🚨 Emergency Contact
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <label className='block font-medium text-gray-700 mb-2'>Name:</label>
                            {isEdit
                                ? <input className='w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='text' 
                                         placeholder="Emergency contact name"
                                         onChange={(e) => setUserData(prev => ({ 
                                             ...prev, 
                                             emergencyContact: { 
                                                 ...prev.emergencyContact, 
                                                 name: e.target.value 
                                             } 
                                         }))} 
                                         value={userData.emergencyContact?.name || ''} />
                                : <div className='bg-gray-50 p-2 rounded-lg text-gray-600'>
                                    {userData.emergencyContact?.name || 'Not provided'}
                                  </div>
                            }
                        </div>

                        <div>
                            <label className='block font-medium text-gray-700 mb-2'>Phone:</label>
                            {isEdit
                                ? <input className='w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                         type='text' 
                                         placeholder="Emergency contact phone"
                                         onChange={(e) => setUserData(prev => ({ 
                                             ...prev, 
                                             emergencyContact: { 
                                                 ...prev.emergencyContact, 
                                                 phone: e.target.value 
                                             } 
                                         }))} 
                                         value={userData.emergencyContact?.phone || ''} />
                                : <div className='bg-gray-50 p-2 rounded-lg text-gray-600'>
                                    {userData.emergencyContact?.phone || 'Not provided'}
                                  </div>
                            }
                        </div>

                        <div>
                            <label className='block font-medium text-gray-700 mb-2'>Relationship:</label>
                            {isEdit
                                ? <select className='w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                          onChange={(e) => setUserData(prev => ({ 
                                              ...prev, 
                                              emergencyContact: { 
                                                  ...prev.emergencyContact, 
                                                  relationship: e.target.value 
                                              } 
                                          }))} 
                                          value={userData.emergencyContact?.relationship || ''}>
                                    <option value="">Select relationship</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Child">Child</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Other">Other</option>
                                  </select>
                                : <div className='bg-gray-50 p-2 rounded-lg text-gray-600'>
                                    {userData.emergencyContact?.relationship || 'Not provided'}
                                  </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {isEdit && (
                <div className='flex gap-4 justify-center pb-8'>
                    <button 
                        onClick={() => {
                            setIsEdit(false);
                            setImage(false);
                            loadUserProfileData();
                        }} 
                        className='border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 font-medium'>
                        Cancel
                    </button>
                    <button 
                        onClick={updateUserProfileData} 
                        className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium'>
                        Save All Changes
                    </button>
                </div>
            )}
        </div>
    ) : null
}

export default MyProfile