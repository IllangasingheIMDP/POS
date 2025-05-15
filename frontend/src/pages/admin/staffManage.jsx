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
        <div className="min-h-screen h-auto bg-neutral-900 text-white font-['Inter']">
            <div className="w-full h-fit relative bg-zinc-900 rounded-2xl p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-white text-2xl font-semibold">Staff Management</h1>
                </div>

                {/* Search and Add New User Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64 h-10 pl-10 pr-4 bg-zinc-800 text-white rounded-xl border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <svg
                            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
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
                        className="flex items-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        <span className="mr-2 text-2xl">+</span> Add New User
                    </button>
                </div>

                {/* Staff Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-800">
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.length > 0 ? (
                                filteredStaff.map(staff => (
                                    <tr key={staff.id} className="border-b border-zinc-700 hover:bg-zinc-800">
                                        <td className="p-4">{staff.id}</td>
                                        <td className="p-4">{staff.username || 'N/A'}</td>
                                        <td className="p-4">{staff.email || 'N/A'}</td>
                                        <td className="p-4">{staff.role || 'N/A'}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleEdit(staff)}
                                                className="text-blue-400 hover:underline mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(staff.id)}
                                                className="text-red-400 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-400">
                                        No staff found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 p-6 rounded-xl w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedStaff ? 'Edit Staff' : 'Add New Staff'}
                        </h2>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full mb-4 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-orange-500"
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
                                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
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