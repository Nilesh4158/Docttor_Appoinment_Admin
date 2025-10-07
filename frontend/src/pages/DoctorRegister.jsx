import { useState } from 'react';
import axios from 'axios';
import upload_area from '../assets/upload_area.png'; // Make sure you have an upload icon asset

const DoctorRegister = () => {

    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        speciality: "General physician",
        degree: "",
        experience: "1 Year",
        about: "",
        fees: "",
        address1: "",
        address2: "",
        licenseDocLink: "",
        degreeDocLink: "",
        experienceDocLink: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    const onRegister = async (event) => {
        event.preventDefault();
        setMessage("Submitting...");

        if (!image) {
            setMessage("Please select a profile image.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('speciality', data.speciality);
        formData.append('degree', data.degree);
        formData.append('experience', data.experience);
        formData.append('about', data.about);
        formData.append('fees', data.fees);
        formData.append('address', JSON.stringify({ line1: data.address1, line2: data.address2 }));
        formData.append('licenseDocLink', data.licenseDocLink);
        formData.append('degreeDocLink', data.degreeDocLink);
        formData.append('experienceDocLink', data.experienceDocLink);

        try {
            // Ensure this URL matches your backend server's address and port
            const response = await axios.post("http://localhost:4000/api/doctor/register", formData);
            if (response.data.success) {
                setMessage(response.data.message);
                // Clear form on successful registration
                setData({
                    name: "", email: "", password: "", speciality: "General physician",
                    degree: "", experience: "1 Year", about: "", fees: "",
                    address1: "", address2: "", licenseDocLink: "", degreeDocLink: "", experienceDocLink: ""
                });
                setImage(null);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("An error occurred during registration.");
            console.error(error);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className='relative z-10 flex justify-center items-center'>
                <form onSubmit={onRegister} className='bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-5xl'>
                    {/* Header */}
                    <div className='text-center mb-10'>
                        <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6 shadow-xl'>
                            <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'></path>
                            </svg>
                        </div>
                        <h2 className='text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4'>
                            Doctor Registration
                        </h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Join our network of healthcare professionals and start making a difference
                        </p>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className='mb-8 text-center'>
                        <label htmlFor="image" className='cursor-pointer group flex flex-col items-center'>
                            <div className='relative'>
                                <div className='w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-4 border-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300'>
                                    <img 
                                        className='w-full h-full object-cover' 
                                        src={image ? URL.createObjectURL(image) : upload_area} 
                                        alt="Upload" 
                                    />
                                </div>
                                <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                                    </svg>
                                </div>
                            </div>
                            <p className='mt-4 text-sm font-medium text-gray-600 group-hover:text-primary transition-colors'>Upload Profile Picture</p>
                            <p className='text-xs text-gray-400 mt-1'>JPG, PNG or GIF (Max 5MB)</p>
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                    </div>

                    {/* Form Fields */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 text-gray-700 mb-8'>
                        {/* Column 1 */}
                        <div className='space-y-6'>
                            <InputField label="Your Name" name="name" value={data.name} onChange={onChangeHandler} placeholder="Enter your full name" />
                            <InputField label="Doctor Email" name="email" type="email" value={data.email} onChange={onChangeHandler} placeholder="Enter your email address" />
                            <InputField label="Set Password" name="password" type="password" value={data.password} onChange={onChangeHandler} placeholder="Create a secure password" />
                            <SelectField label="Experience" name="experience" value={data.experience} onChange={onChangeHandler} options={["1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6-10 Years", "10+ Years"]} />
                            <InputField label="Consultation Fees" name="fees" type="number" value={data.fees} onChange={onChangeHandler} placeholder="Enter fees amount" />
                        </div>

                        {/* Column 2 */}
                        <div className='space-y-6'>
                            <SelectField label="Speciality" name="speciality" value={data.speciality} onChange={onChangeHandler} options={["General physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"]} />
                            <InputField label="Degree" name="degree" value={data.degree} onChange={onChangeHandler} placeholder="e.g., MBBS, MD, PhD" />
                            <div className='space-y-4'>
                                <label className='block text-sm font-medium text-gray-700'>Address</label>
                                <input 
                                    name="address1" 
                                    value={data.address1} 
                                    onChange={onChangeHandler} 
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/70 backdrop-blur-sm' 
                                    type="text" 
                                    placeholder='Address Line 1' 
                                    required 
                                />
                                <input 
                                    name="address2" 
                                    value={data.address2} 
                                    onChange={onChangeHandler} 
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/70 backdrop-blur-sm' 
                                    type="text" 
                                    placeholder='Address Line 2' 
                                    required 
                                />
                            </div>
                            
                            {/* Supporting Documents Section */}
                            <div className='mb-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Supporting Documents</h3>
                                <div className='space-y-4'>
                                    <InputField 
                                        label="Medical License Document Link" 
                                        name="licenseDocLink" 
                                        type="url" 
                                        value={data.licenseDocLink} 
                                        onChange={onChangeHandler} 
                                        placeholder="https://drive.google.com/file/d/your-license-doc/view" 
                                    />
                                    <InputField 
                                        label="Degree Certificate Document Link" 
                                        name="degreeDocLink" 
                                        type="url" 
                                        value={data.degreeDocLink} 
                                        onChange={onChangeHandler} 
                                        placeholder="https://drive.google.com/file/d/your-degree-doc/view" 
                                    />
                                    <InputField 
                                        label="Experience Certificate Document Link" 
                                        name="experienceDocLink" 
                                        type="url" 
                                        value={data.experienceDocLink} 
                                        onChange={onChangeHandler} 
                                        placeholder="https://drive.google.com/file/d/your-experience-doc/view" 
                                    />
                                </div>
                                <div className='mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                                    <p className='text-xs text-blue-700'>
                                        <strong>Note:</strong> Please provide direct links to your document files (Google Drive, Dropbox, etc.). 
                                        Make sure the links are publicly accessible or have proper sharing permissions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mb-8'>
                        <label className='block text-sm font-medium text-gray-700 mb-3'>About Doctor</label>
                        <textarea 
                            name="about" 
                            value={data.about} 
                            onChange={onChangeHandler} 
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none' 
                            rows={4} 
                            placeholder='Write a brief introduction about yourself, your experience, and areas of expertise...' 
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type='submit' 
                        className='w-full py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                        {message === "Submitting..." ? (
                            <div className='flex items-center justify-center'>
                                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Creating Account...
                            </div>
                        ) : (
                            <>
                                Register as Doctor
                                <svg className='inline-block ml-2 w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'></path>
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Message Display */}
                    {message && (
                        <div className={`text-center mt-6 p-4 rounded-lg font-medium ${
                            message.includes("successful") || message.includes("successfully") 
                                ? "bg-green-50 text-green-700 border border-green-200" 
                                : message === "Submitting..." 
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                        }`}>
                            {message}
                        </div>
                    )}
                    
                    {/* Login Link */}
                    <div className='text-center mt-8 pt-6 border-t border-gray-200'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            <a 
                                href="http://localhost:5174/login" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='font-medium text-primary hover:text-purple-600 transition-colors duration-200 hover:underline'
                            >
                                Login here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Helper components for cleaner code
const InputField = ({ label, ...props }) => {
    return (
        <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>{label}</label>
            <input 
                {...props} 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/70 backdrop-blur-sm' 
                required 
            />
        </div>
    );
};

const SelectField = ({ label, options, ...props }) => {
    return (
        <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>{label}</label>
            <select 
                {...props} 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/70 backdrop-blur-sm'
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
};

export default DoctorRegister;

