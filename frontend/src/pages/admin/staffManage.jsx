import React, { useState, useEffect } from 'react';
import api from '../../constants/api';

const StaffManagement = () => {
    const [staffList, setStaffList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        password: '',
        active: false
    });
    // Fetch staff data on component mount
    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = () => {
        api.get('/staff')
            .then(response => {
                console.log(response.data);
                setStaffList(response.data);
            })
            .catch(error => {
                console.error('Error fetching staff:', error);
            });
    };

    // Filter staff based on search term
    const filteredStaff = staffList.filter(staff =>
        staff.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle add/edit staff
const handleSave = () => {
    if (selectedStaff) {
        // Update existing staff
        api.put(`/staff/${selectedStaff.id}`, 
            {
                username: formData.username,
                role: formData.role,
                active: formData.active
            },
            { 
                params: formData.password ? { password: formData.password } : {} 
            }
        )
        .then(() => {
            fetchStaff();
            setShowModal(false);
            setSelectedStaff(null);
            setFormData({ username: '', role: '', password: '', active: false });
        })
        .catch(error => console.error('Error updating staff:', error));
    } else {
        // Create new staff
        api.post('/staff', 
            {
                username: formData.username,
                role: formData.role,
                active: formData.active
            },
            { 
                params: { password: formData.password } 
            }
        )
        .then(() => {
            fetchStaff();
            setShowModal(false);
            setFormData({ username: '', role: '', password: '', active: false });
        })
        .catch(error => console.error('Error adding staff:', error));
    }
};

    // Handle delete staff
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            api.delete(`/staff/${id}`)
                .then(() => {
                    fetchStaff();
                })
                .catch(error => console.error('Error deleting staff:', error));
        }
    };

    // Handle edit staff
const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setFormData({
        username: staff.username,
        role: staff.role,
        active: staff.active,
        password: '' // Password is not included in GET response
    });
    setShowModal(true);
};

    return (
        <div className="min-h-screen h-auto w-full bg-[#0B161A] text-white font-['Inter'] p-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="w-full h-fit bg-[#141E20] rounded-2xl p-8 shadow-lg">
                    {/* Header Section */}
                    <div className="mb-8 flex-col">
                        <h1 className="text-white text-3xl font-semibold">Staff Management</h1>
                        <hr className='w-full border-t-2 mt-2 border-orange-400' />
                    </div>

                    {/* Search and Add New User Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search Employee..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-zinc-800 text-white rounded-xl border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <svg
                                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedStaff(null);
                                setFormData({ username: '', email: '', role: '', password: '' });
                                setShowModal(true);
                            }}
                            className="w-full  hover:cursor-pointer md:w-auto flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out"
                        >
                            <span className="mr-2 text-2xl">+</span> Add New User
                        </button>
                    </div>

                    {/* Staff Table */}
                    <div className="overflow-x-auto bg-zinc-800/50 rounded-xl border border-zinc-700">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-zinc-800">
                                    <th className="p-5">ID</th>
                                    <th className="p-5">Name</th>
                                    <th className="p-5">Email</th>
                                    <th className="p-5">Role</th>
                                    <th className="p-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.length > 0 ? (
                                    filteredStaff.map(staff => (
                                        <tr key={staff.id} className="border-b border-zinc-700 hover:bg-zinc-800/70 transition duration-200">
                                            <td className="p-5">{staff.id}</td>
                                            <td className="p-5">{staff.username || 'N/A'}</td>
                                            <td className="p-5">{staff.email || 'N/A'}</td>
                                            <td className="p-5">
                                                <span className="px-3 py-1 rounded-full text-sm bg-zinc-700">
                                                    {staff.role || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <button
                                                    onClick={() => handleEdit(staff)}
                                                    className="text-blue-400 hover:cursor-pointer hover:text-blue-300 mr-4 transition duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(staff.id)}
                                                    className="text-red-400 hover:cursor-pointer hover:text-red-300 transition duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-5 text-center text-gray-400">
                                            No staff found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Update the Modal styling */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md border border-zinc-700 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6">
                            {selectedStaff ? 'Edit Staff' : 'Add New Staff'}
                        </h2>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full mb-4 p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-orange-500"
                        >
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="CHEF">Chef</option>
                            <option value="CASHIER">Cashier</option>
                        </select>
                        {!selectedStaff && (
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="w-full mb-4 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-orange-500"
                            />
                        )}
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="mr-2"
                            />
                            <label>Active</label>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 hover:cursor-pointer  text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 hover:cursor-pointer  text-white rounded"
                            >
                                {selectedStaff ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;