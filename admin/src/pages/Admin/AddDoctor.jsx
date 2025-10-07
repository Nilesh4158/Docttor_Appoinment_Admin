import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [availableFrom, setAvailableFrom] = useState('')
    const [availableTo, setAvailableTo] = useState('')
    
    // Supporting Document Links
    const [licenseDocLink, setLicenseDocLink] = useState('')
    const [degreeDocLink, setDegreeDocLink] = useState('')
    const [experienceDocLink, setExperienceDocLink] = useState('')
    const [currentStep, setCurrentStep] = useState(1)

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const specialityOptions = [
        'General physician', 'Gynecologist', 'Dermatologist', 
        'Pediatricians', 'Neurologist', 'Gastroenterologist',
        'Cardiologist', 'Orthopedic', 'Psychiatrist', 'Oncologist'
    ]

    const experienceOptions = [
        '1 Year', '2 Years', '3 Years', '4 Years', '5 Years',
        '6 Years', '7 Years', '8 Years', '9 Years', '10 Years',
        '10+ Years'
    ]

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Profile image is required')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('phone', phone)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.append('licenseNumber', licenseNumber)
            formData.append('availableFrom', availableFrom)
            formData.append('availableTo', availableTo)

            // Add supporting document links
            formData.append('licenseDocLink', licenseDocLink)
            formData.append('degreeDocLink', degreeDocLink)
            formData.append('experienceDocLink', experienceDocLink)

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                // Reset form
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setPhone('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
                setLicenseNumber('')
                setAvailableFrom('')
                setAvailableTo('')
                setLicenseDocLink('')
                setDegreeDocLink('')
                setExperienceDocLink('')
                setCurrentStep(1)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const renderStepIndicator = () => (
        <div className='flex items-center justify-center mb-8'>
            {[1, 2, 3].map((step) => (
                <div key={step} className='flex items-center'>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep >= step 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-500'
                    }`}>
                        {step}
                    </div>
                    {step < 3 && (
                        <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                            currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    )

    return (
        <div className='w-full h-full p-6 bg-gradient-to-br from-gray-50 to-blue-50'>
            <div className='max-w-6xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                        Add New Doctor
                    </h1>
                    <p className='text-gray-600 text-lg'>Create a comprehensive doctor profile with supporting documents</p>
                </div>

                <form onSubmit={onSubmitHandler} className='bg-white rounded-3xl shadow-2xl p-8 border border-gray-100'>
                    {renderStepIndicator()}

                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className='space-y-8'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Basic Information</h3>
                            
                            {/* Profile Picture Upload */}
                            <div className='flex flex-col items-center mb-8'>
                                <label htmlFor="doc-img" className='cursor-pointer group'>
                                    <div className='relative'>
                                        <img 
                                            className='w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full object-cover border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105' 
                                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                            alt="" 
                                        />
                                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300 flex items-center justify-center'>
                                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept="image/*" hidden />
                                <p className='text-gray-600 mt-4 text-center font-medium'>Upload Doctor Profile Picture</p>
                                <p className='text-gray-400 text-sm'>Click to upload (JPG, PNG, GIF)</p>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                {/* Left Column */}
                                <div className='space-y-6'>
                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Full Name *</label>
                                        <input 
                                            onChange={e => setName(e.target.value)} 
                                            value={name} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="text" 
                                            placeholder='Dr. John Doe' 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Email Address *</label>
                                        <input 
                                            onChange={e => setEmail(e.target.value)} 
                                            value={email} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="email" 
                                            placeholder='doctor@hospital.com' 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Phone Number *</label>
                                        <input 
                                            onChange={e => setPhone(e.target.value)} 
                                            value={phone} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="tel" 
                                            placeholder='+1 (555) 123-4567' 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Password *</label>
                                        <input 
                                            onChange={e => setPassword(e.target.value)} 
                                            value={password} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="password" 
                                            placeholder='Create secure password' 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className='space-y-6'>
                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Speciality *</label>
                                        <select 
                                            onChange={e => setSpeciality(e.target.value)} 
                                            value={speciality} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700'
                                        >
                                            {specialityOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Experience *</label>
                                        <select 
                                            onChange={e => setExperience(e.target.value)} 
                                            value={experience} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700'
                                        >
                                            {experienceOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Consultation Fees (₹) *</label>
                                        <input 
                                            onChange={e => setFees(e.target.value)} 
                                            value={fees} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="number" 
                                            placeholder='500' 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 font-semibold mb-2'>Medical Degree *</label>
                                        <input 
                                            onChange={e => setDegree(e.target.value)} 
                                            value={degree} 
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                            type="text" 
                                            placeholder='MBBS, MD' 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Available From</label>
                                    <input 
                                        onChange={e => setAvailableFrom(e.target.value)} 
                                        value={availableFrom} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                        type="time" 
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Available To</label>
                                    <input 
                                        onChange={e => setAvailableTo(e.target.value)} 
                                        value={availableTo} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                        type="time" 
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <button 
                                    type="button" 
                                    onClick={nextStep}
                                    className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Address & About */}
                    {currentStep === 2 && (
                        <div className='space-y-8'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Address & About</h3>
                            
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Address Line 1 *</label>
                                    <input 
                                        onChange={e => setAddress1(e.target.value)} 
                                        value={address1} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                        type="text" 
                                        placeholder='123 Medical Center St' 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Address Line 2 *</label>
                                    <input 
                                        onChange={e => setAddress2(e.target.value)} 
                                        value={address2} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                        type="text" 
                                        placeholder='Suite 456, City, State' 
                                        required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-gray-700 font-semibold mb-2'>Medical License Number</label>
                                <input 
                                    onChange={e => setLicenseNumber(e.target.value)} 
                                    value={licenseNumber} 
                                    className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                    type="text" 
                                    placeholder='License Number' 
                                />
                            </div>

                            <div>
                                <label className='block text-gray-700 font-semibold mb-2'>About Doctor *</label>
                                <textarea 
                                    onChange={e => setAbout(e.target.value)} 
                                    value={about} 
                                    className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700' 
                                    rows={6} 
                                    placeholder='Write about the doctor, their expertise, achievements, and approach to patient care...'
                                    required
                                />
                            </div>

                            <div className='flex justify-between'>
                                <button 
                                    type="button" 
                                    onClick={prevStep}
                                    className='px-8 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300'
                                >
                                    Previous
                                </button>
                                <button 
                                    type="button" 
                                    onClick={nextStep}
                                    className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Supporting Documents */}
                    {currentStep === 3 && (
                        <div className='space-y-8'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Supporting Documents</h3>
                            
                            <div className='grid grid-cols-1 gap-6'>
                                {/* Medical License Document Link */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>
                                        Medical License Document Link
                                    </label>
                                    <div className='relative'>
                                        <input 
                                            onChange={(e) => setLicenseDocLink(e.target.value)} 
                                            value={licenseDocLink}
                                            type="url" 
                                            placeholder="https://drive.google.com/..." 
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                                        />
                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Degree Certificate Link */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>
                                        Degree Certificate Document Link
                                    </label>
                                    <div className='relative'>
                                        <input 
                                            onChange={(e) => setDegreeDocLink(e.target.value)} 
                                            value={degreeDocLink}
                                            type="url" 
                                            placeholder="https://drive.google.com/..." 
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200'
                                        />
                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Certificate Link */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>
                                        Experience Certificate Document Link
                                    </label>
                                    <div className='relative'>
                                        <input 
                                            onChange={(e) => setExperienceDocLink(e.target.value)} 
                                            value={experienceDocLink}
                                            type="url" 
                                            placeholder="https://drive.google.com/..." 
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200'
                                        />
                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                                    <div className='flex'>
                                        <div className='flex-shrink-0'>
                                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='ml-3'>
                                            <p className='text-sm text-blue-800'>
                                                <strong>Note:</strong> Please provide direct links to document files (Google Drive, Dropbox, etc.). 
                                                Make sure the links are publicly accessible or have proper sharing permissions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
                                <div className='flex items-start space-x-3'>
                                    <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className='text-blue-800 font-semibold'>Document Requirements</p>
                                        <p className='text-blue-700 text-sm mt-1'>
                                            Please upload clear scanned copies of all documents. Accepted formats: PDF, JPG, PNG (Max size: 5MB each)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <button 
                                    type="button" 
                                    onClick={prevStep}
                                    className='px-8 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300'
                                >
                                    Previous
                                </button>
                                <button 
                                    type='submit' 
                                    className='px-12 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                                >
                                    Create Doctor Profile
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AddDoctor