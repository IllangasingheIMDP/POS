import React, { useState, useEffect } from 'react';
import api from '../../constants/api';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState(['Starters', 'Breakfast', 'Lunch', 'Supper', 'Dessert', 'Beverages']);
    const [selectedCategory, setSelectedCategory] = useState('Starters');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get('/menu');
                console.log(response);
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await api.delete(`/menu/${id}`);
            setMenuItems(menuItems.filter(item => item.id !== id));
            setHasChanges(true);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Filter items by selected category
    const filteredItems = menuItems.filter(item => item.categoryName === selectedCategory);

    return (
        <div className="flex min-h-screen bg-neutral-900 text-white">
            <Sidebar />
            <div className="w-[1114px] h-[877px] relative bg-zinc-900 rounded-2xl p-6 font-['Inter']">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-2xl font-semibold">Menu Management</h1>
                    <button className="bg-neutral-900 text-white text-sm font-bold py-2 px-4 rounded border border-stone-600/60">
                        Manage Categories
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex space-x-8 mb-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm font-medium pb-2 border-b-2 ${selectedCategory === category ? 'text-orange-400 border-orange-400' : 'text-white border-transparent'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    {/* Add New Dish Card */}
                    <div
                        onClick={() => setShowAddModal(true)}
                        className="w-64 h-80 bg-zinc-900 rounded-lg border border-yellow-700 flex items-center justify-center cursor-pointer"
                    >
                        <div className="text-center text-yellow-700">
                            <span className="text-4xl">+</span>
                            <p className="text-lg font-medium mt-2">Add new dish</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    {filteredItems.map(item => (
                        <div key={item.id} className="w-64 h-80 bg-zinc-900 rounded-lg border border-neutral-600 relative">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-4 right-4 opacity-70"
                            >
                                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={item.imageFilename ? `path/to/images/${item.imageFilename}` : 'https://placehold.co/157x152'}
                                alt={item.name}
                                className="w-40 h-36 mx-auto mt-6 rounded-full border border-white"
                            />
                            <div className="text-center mt-4">
                                <p className="text-white text-sm font-bold">{item.name}</p>
                                <p className="text-zinc-500 text-xs font-bold mt-2">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentItem(item);
                                    setShowEditModal(true);
                                }}
                                className="w-full h-14 bg-orange-400/40 rounded-b-lg flex items-center justify-center text-orange-500 text-sm font-bold mt-4"
                            >
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                                </svg>
                                Edit dish
                            </button>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start space-x-6 mt-6">
                    <button
                        onClick={() => setHasChanges(false)}
                        className="w-48 h-12 bg-neutral-900 text-orange-500 text-base font-medium rounded-lg border border-orange-500"
                    >
                        Discard Changes
                    </button>
                    <button
                        onClick={() => setHasChanges(false)}
                        className="w-48 h-12 bg-orange-500 text-white text-base font-medium rounded-lg"
                        disabled={!hasChanges}
                    >
                        Save Changes
                    </button>
                </div>

                {/* Add Modal */}
                {showAddModal && (
                    <AddModal
                        onClose={() => setShowAddModal(false)}
                        onSave={(newItem) => {
                            setMenuItems([...menuItems, newItem]);
                            setHasChanges(true);
                        }}
                    />
                )}

                {/* Edit Modal */}
                {showEditModal && currentItem && (
                    <EditModal
                        item={currentItem}
                        onClose={() => setShowEditModal(false)}
                        onSave={(updatedItem) => {
                            setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
                            setHasChanges(true);
                        }}
                    />
                )}
            </div>
        </div>
            );
};

            // Add Modal Component
            const AddModal = ({onClose, onSave}) => {
    const [formData, setFormData] = useState({
                name: '',
            price: '',
            categoryId: '',
            description: '',
            available: true,
            image: null,
    });

    const handleSubmit = async (e) => {
                e.preventDefault();
            const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                data.append('image', formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

            try {
            const response = await api.post('/menu', data, {
                headers: {'Content-Type': 'multipart/form-data' },
            });
            onSave(response.data);
            onClose();
        } catch (error) {
                console.error('Error adding item:', error);
        }
    };

            return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-zinc-800 p-6 rounded-lg w-96">
                    <h2 className="text-white text-xl font-semibold mb-4">Add New Dish</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Category ID"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <label className="flex items-center text-white">
                            <input
                                type="checkbox"
                                checked={formData.available}
                                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                className="mr-2"
                            />
                            Available
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <div className="flex justify-end space-x-4">
                            <button onClick={onClose} className="px-4 py-2 bg-neutral-900 text-orange-500 rounded">Cancel</button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            );
};

            // Edit Modal Component
            const EditModal = ({item, onClose, onSave}) => {
    const [formData, setFormData] = useState({...item});

    const handleSubmit = async (e) => {
                e.preventDefault();
            const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                data.append('image', formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

            try {
            const response = await api.put(`/menu/${item.id}`, data, {
                headers: {'Content-Type': 'multipart/form-data' },
            });
            onSave(response.data);
            onClose();
        } catch (error) {
                console.error('Error updating item:', error);
        }
    };

            return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-zinc-800 p-6 rounded-lg w-96">
                    <h2 className="text-white text-xl font-semibold mb-4">Edit Dish</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Category ID"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <label className="flex items-center text-white">
                            <input
                                type="checkbox"
                                checked={formData.available}
                                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                className="mr-2"
                            />
                            Available
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            className="w-full p-2 rounded bg-neutral-900 text-white"
                        />
                        <div className="flex justify-end space-x-4">
                            <button onClick={onClose} className="px-4 py-2 bg-neutral-900 text-orange-500 rounded">Cancel</button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            );
};

            export default MenuManagement;