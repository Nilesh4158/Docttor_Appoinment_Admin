import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext'; // Ensure this path is correct
import { toast } from 'react-toastify';

const ApproveDoctors = () => {
    const [pendingDoctors, setPendingDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use context to get the correct backend URL and admin token
    const { backendUrl, aToken, getAllDoctors } = useContext(AdminContext);

    const fetchPendingDoctors = useCallback(async () => {
        // Don't try to fetch if the admin token isn't available yet
        if (!aToken) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/admin/pending-doctors`, {
                // Use the correct token name 'aToken' in the headers
                headers: { aToken }
            });

            if (response.data.success) {
                setPendingDoctors(response.data.data);
            } else {
                toast.error("Failed to fetch pending doctors.");
            }
        } catch (error) {
            toast.error("An error occurred while fetching data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [aToken, backendUrl]);

    const handleStatusUpdate = async (doctorId, status) => {
        try {
            const response = await axios.post(`${backendUrl}/api/admin/update-doctor-status`, 
                { doctorId, status }, 
                { headers: { aToken } }
            );

            if (response.data.success) {
                toast.success(`Doctor has been ${status}.`);
                fetchPendingDoctors(); // Refresh the pending doctors list
                getAllDoctors(); // Refresh the main doctors list in AdminContext
            } else {
                toast.error("Failed to update status.");
            }
        } catch (error) {
            toast.error("An error occurred while updating status.");
            console.error(error);
        }
    };

    // This hook will run once the component mounts and whenever the aToken changes
    useEffect(() => {
        fetchPendingDoctors();
    }, [fetchPendingDoctors]);

    if (loading) {
        return <p className='p-5 font-medium text-gray-600'>Loading pending approvals...</p>;
    }

    return (
        <div className='p-5 w-full'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Pending Doctor Approvals</h2>
            <div className="overflow-x-auto">
                {pendingDoctors.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm table-fixed">
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 w-1/5">Name</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 w-1/5">Email</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 w-1/6">Speciality</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 w-1/4">Documents</th>
                                <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600 w-1/5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingDoctors.map((doctor) => (
                                <tr key={doctor._id} className='hover:bg-gray-50'>
                                    <td className="py-4 px-4 border-b align-top">
                                        <div className="font-medium text-gray-900">{doctor.name}</div>
                                    </td>
                                    <td className="py-4 px-4 border-b align-top">
                                        <div className="text-gray-600 text-sm">{doctor.email}</div>
                                    </td>
                                    <td className="py-4 px-4 border-b align-top">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {doctor.speciality}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 border-b align-top">
                                        <div className="space-y-1">
                                            {doctor.documents?.licenseDoc && (
                                                <div>
                                                    <a href={doctor.documents.licenseDoc} target="_blank" rel="noopener noreferrer" className='inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium'>
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        License Document
                                                    </a>
                                                </div>
                                            )}
                                            {doctor.documents?.degreeDoc && (
                                                <div>
                                                    <a href={doctor.documents.degreeDoc} target="_blank" rel="noopener noreferrer" className='inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium'>
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Degree Document
                                                    </a>
                                                </div>
                                            )}
                                            {doctor.documents?.experienceDoc && (
                                                <div>
                                                    <a href={doctor.documents.experienceDoc} target="_blank" rel="noopener noreferrer" className='inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium'>
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Experience Document
                                                    </a>
                                                </div>
                                            )}
                                            {!doctor.documents?.licenseDoc && !doctor.documents?.degreeDoc && !doctor.documents?.experienceDoc && (
                                                <span className='text-gray-500 text-xs italic'>No documents uploaded</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 border-b align-top">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                onClick={() => handleStatusUpdate(doctor._id, 'approved')} 
                                                className='bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(doctor._id, 'rejected')} 
                                                className='bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='text-gray-500'>No pending doctor registrations found.</p>
                )}
            </div>
        </div>
    );
};

export default ApproveDoctors;

