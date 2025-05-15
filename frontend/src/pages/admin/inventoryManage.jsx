import React, { useState, useEffect } from 'react';
import api from '../../constants/api';

const InventoryManagement = () => {
    const [inventoryList, setInventoryList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        threshold: 0
    });

    // Fetch inventory data on component mount
    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = () => {
        api.get('/inventory')
            .then(response => {
                console.log(response.data);
                setInventoryList(response.data);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
            });
    };

    // Filter inventory based on search term
    const filteredInventory = inventoryList.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // Handle add/edit inventory
    const handleSave = () => {
        if (selectedItem) {
            // Update existing item
            api.put(`/inventory/${selectedItem.id}`, formData)
                .then(() => {
                    fetchInventory();
                    setShowModal(false);
                    setSelectedItem(null);
                    setFormData({ name: '', quantity: 0, threshold: 0 });
                })
                .catch(error => console.error('Error updating inventory item:', error));
        } else {
            // Create new item
            api.post('/inventory', formData)
                .then(() => {
                    fetchInventory();
                    setShowModal(false);
                    setFormData({ name: '', quantity: 0, threshold: 0 });
                })
                .catch(error => console.error('Error adding inventory item:', error));
        }
    };

    // Handle edit inventory
    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormData({
            name: item.name,
            quantity: item.quantity,
            threshold: item.threshold
        });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen w-full h-auto bg-[#0B161A] text-white font-['Inter'] p-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="w-full h-fit bg-[#141E20] rounded-2xl p-8 shadow-lg">
                    {/* Header Section */}
                    <div className="mb-8 flex-col">
                        <h1 className="text-white text-3xl font-semibold">Inventory Management</h1>
                        <hr className='w-full border-t-2 mt-2 border-orange-400' />
                    </div>

                    {/* Search and Add New Item Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search Item..."
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
                                setSelectedItem(null);
                                setFormData({ name: '', quantity: 0, threshold: 0 });
                                setShowModal(true);
                            }}
                            className="w-full  hover:cursor-pointer md:w-auto flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out"
                        >
                            <span className="mr-2 text-2xl">+</span> Add New Item
                        </button>
                    </div>

                    {/* Inventory Table */}
                    <div className="overflow-x-auto bg-zinc-800/50 rounded-xl border border-zinc-700">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-zinc-800">
                                    <th className="p-5">ID</th>
                                    <th className="p-5">Name</th>
                                    <th className="p-5">Quantity</th>
                                    <th className="p-5">Threshold</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventory.length > 0 ? (
                                    filteredInventory.map(item => (
                                        <tr key={item.id} className="border-b border-zinc-700 hover:bg-zinc-800/70 transition duration-200">
                                            <td className="p-5">{item.id}</td>
                                            <td className="p-5">{item.name}</td>
                                            <td className="p-5">{item.quantity}</td>
                                            <td className="p-5">{item.threshold}</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    item.quantity <= item.threshold 
                                                    ? 'bg-red-500/20 text-red-400' 
                                                    : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                    {item.quantity <= item.threshold ? 'Low Stock' : 'In Stock'}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-400 hover:text-blue-300 hover:cursor-pointer mr-4 transition duration-200"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-5 text-center text-gray-400">
                                            No inventory items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md border border-zinc-700 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6">
                            {selectedItem ? 'Edit Item' : 'Add New Item'}
                        </h2>
                        <div className="space-y-4">
    <div>
        <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
            Item Name
        </label>
        <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
    </div>
    <div>
        <label htmlFor="quantity" className="block text-white text-sm font-medium mb-1">
            Quantity
        </label>
        <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
    </div>
    <div>
        <label htmlFor="threshold" className="block text-white text-sm font-medium mb-1">
            Threshold
        </label>
        <input
            type="number"
            id="threshold"
            name="threshold"
            value={formData.threshold}
            onChange={handleInputChange}
            className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
    </div>
</div>
                        <div className="flex mt-4 justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-zinc-700 hover:cursor-pointer hover:bg-zinc-600 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                            >
                                {selectedItem ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryManagement;