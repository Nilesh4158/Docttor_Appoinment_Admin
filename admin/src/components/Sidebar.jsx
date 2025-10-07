import { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r shadow-2xl z-40 overflow-y-auto'>
      {aToken && (
        <div className='pt-6'>
          <h2 className='text-white text-lg font-semibold px-6 mb-8'>Admin Panel</h2>
          <ul className='space-y-2 px-4'>
            <NavLink 
              to={'/admin-dashboard'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.home_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Dashboard</p>
            </NavLink>

            <NavLink 
              to={'/all-appointments'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.appointment_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Appointments</p>
            </NavLink>

            <NavLink 
              to={'/add-doctor'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.add_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Add Doctor</p>
            </NavLink>

            <NavLink 
              to={'/doctor-list'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.people_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Doctors List</p>
            </NavLink>

            <NavLink 
              to='/patients-list' 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.patients_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Patients List</p>
            </NavLink>

            <NavLink 
              to='/approve-doctors' 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.tick_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Approve Doctors</p>
            </NavLink>
          </ul>
        </div>
      )}

      {dToken && (
        <div className='pt-6'>
          <h2 className='text-white text-lg font-semibold px-6 mb-8'>Doctor Panel</h2>
          <ul className='space-y-2 px-4'>
            <NavLink 
              to={'/doctor-dashboard'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.home_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Dashboard</p>
            </NavLink>

            <NavLink 
              to={'/doctor-appointments'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.appointment_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Appointments</p>
            </NavLink>

            <NavLink 
              to={'/doctor-profile'} 
              className={({ isActive }) => `
                flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md hover:transform hover:scale-102'
                }
              `}
            >
              <div className="p-2 rounded-lg bg-slate-700">
                <img className='w-5 h-5 filter brightness-0 invert' src={assets.people_icon} alt='' />
              </div>
              <p className='hidden md:block font-medium'>Profile</p>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar