import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';


export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // Sanitize tokens coming from storage to avoid strings like 'undefined' or 'null'
    const sanitizeToken = (t) => {
        if (!t) return ''
        if (t === 'undefined' || t === 'null') return ''
        if (t.length < 20) return ''
        return t
    }

    const [dToken, setDToken] = useState(sanitizeToken(localStorage.getItem('dToken')))
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting Doctor appointment data from Database using API
    const getAppointments = async () => {
        try {
            if (!dToken) {
                toast.error("Not authenticated. Please login again.")
                return
            }
            
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { 
                headers: { 
                    dToken: dToken,
                    Authorization: `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                } 
            })

            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log('Get appointments error:', error)
            const msg = error.response?.data?.message || error.message
            toast.error(msg)
            if (msg && msg.toLowerCase().includes('not authorized')) {
                localStorage.removeItem('dToken')
                setDToken('')
            }
        }
    }

    // Getting Doctor profile data from Database using API
    const getProfileData = async () => {
        try {
            if (!dToken) {
                toast.error("Not authenticated. Please login again.")
                return
            }
            
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { 
                headers: { 
                    dToken: dToken,
                    Authorization: `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                } 
            })
            setProfileData(data.profileData)
        } catch (error) {
            console.log('Get profile error:', error)
            const msg = error.response?.data?.message || error.message
            toast.error(msg)
            if (msg && msg.toLowerCase().includes('not authorized')) {
                localStorage.removeItem('dToken')
                setDToken('')
            }
        }
    }

        // Function to cancel doctor appointment using API
    const cancelAppointment = async (appointmentId) => {
        try {
            if (!dToken) {
                toast.error("Not authenticated. Please login again.")
                return
            }
            
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', 
                { appointmentId }, 
                { headers: { 
                    dToken: dToken,
                    Authorization: `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }}
            )

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log('Cancel appointment error:', error)
            const msg = error.response?.data?.message || error.message
            toast.error(msg)
            if (msg && msg.toLowerCase().includes('not authorized')) {
                localStorage.removeItem('dToken')
                setDToken('')
            }
        }
    }

    // Function to Mark appointment completed using API
    const completeAppointment = async (appointmentId) => {
        try {
            if (!dToken) {
                toast.error("Not authenticated. Please login again.")
                return
            }
            
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', 
                { appointmentId }, 
                { headers: { 
                    dToken: dToken,
                    Authorization: `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }}
            )

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log('Complete appointment error:', error)
            const msg = error.response?.data?.message || error.message
            toast.error(msg)
            if (msg && msg.toLowerCase().includes('not authorized')) {
                localStorage.removeItem('dToken')
                setDToken('')
            }
        }
    }

    // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {
            if (!dToken) {
                toast.error("Not authenticated. Please login again.")
                return
            }
            
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { 
                headers: { 
                    dToken: dToken,
                    Authorization: `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                } 
            })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log('Get dashboard error:', error)
            const msg = error.response?.data?.message || error.message
            toast.error(msg)
            if (msg && msg.toLowerCase().includes('not authorized')) {
                localStorage.removeItem('dToken')
                setDToken('')
            }
        }
    }

    // Keep localStorage in sync when token changes
    // and ensure it is always sanitized
    // Note: Consumers should call setDToken with raw token; we sanitize here on write.
    const _origSetDToken = setDToken
    const safeSetDToken = (val) => {
        const clean = sanitizeToken(val)
        if (clean) {
            localStorage.setItem('dToken', clean)
        } else {
            localStorage.removeItem('dToken')
        }
        _origSetDToken(clean)
    }

    const value = {
    dToken, setDToken: safeSetDToken, backendUrl,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )


}

DoctorContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default DoctorContextProvider