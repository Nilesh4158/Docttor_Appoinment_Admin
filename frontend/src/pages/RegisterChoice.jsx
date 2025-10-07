import { Link } from 'react-router-dom';

const RegisterChoice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-600/10 to-blue-600/10 rounded-full blur-2xl animate-pulse' style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full">
        {/* Header Section */}
        <div className="mb-12">
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6 shadow-xl'>
            <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Join Prescripto
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your role to get started with our comprehensive healthcare platform
          </p>
        </div>
        
        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Patient Card */}
          <Link
            to="/login"
            className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-green-400"
          >
            {/* Card background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">
                Join as Patient
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Book appointments, manage your health records, and connect with trusted healthcare providers.
              </p>
              <div className="flex items-center justify-center text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Doctor Card */}
          <Link
            to="/register-doctor"
            className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400"
          >
            {/* Card background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">
                Join as Doctor
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage your practice, schedule appointments, and provide quality healthcare to patients.
              </p>
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                Register Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-purple-600 transition-colors duration-200 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;

