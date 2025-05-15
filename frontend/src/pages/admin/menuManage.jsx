import React, { useState, useEffect } from 'react';
import api from '../../constants/api';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Starters');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const handleAddCategory = async (data) => {
        try {
            const response = await api.post('/categories', data);
            setCategories([...categories, response.data]);
        } catch (error) {
            alert('Error adding category', error);
        }
    };

    const handleEditCategory = async (id, data) => {
        try {
            const response = await api.put(`/categories/${id}`, data);
            setCategories(categories.map(cat => cat.id === id ? response.data : cat));
        } catch (error) {
            alert('Error updating category', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (error) {
            alert('Error deleting category', error);
        }
    };
    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get('/menu');
                //console.log(response);
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                //console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
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
        <div className="menu-page w-full p-8 flex min-h-screen h-auto bg-[#0B161A] text-white">
            <style jsx>{`
        .menu-page::-webkit-scrollbar {
            width: 0; /* Hide scrollbar in Webkit browsers */
        }
        .menu-page {
            scrollbar-width: none; /* Hide scrollbar in Firefox */
            -ms-overflow-style: none; /* Hide scrollbar in IE/Edge */
        }
    `}</style>

            <div className="w-full h-fit relative bg-[#141E20] rounded-2xl p-6 font-['Inter']">
                {/* Header */}
                <div className='flex-col'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-3xl font-semibold">Menu Management</h1>
                    <button
                        className="bg-orange-400 text-black text-sm hover:cursor-pointer font-bold py-2 px-4 rounded border border-stone-600/60"
                        onClick={() => setShowCategoryModal(true)}
                    >
                        Manage Categories
                    </button>
                </div>
                <hr className='w-full border-t-2 mt-2 border-orange-400' />
                </div>



                <div className="flex items-center space-x-8 mb-8 border-b border-zinc-800 pb-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`relative px-4 hover:cursor-pointer py-2 transition-all duration-300 ${selectedCategory === category.name
                                ? 'text-orange-400'
                                : 'text-white hover:text-orange-300'
                                }`}
                        >
                            {category.name}
                            {selectedCategory === category.name && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 -mb-2"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="scroll-container max-h-[664px] overflow-y-auto">
                    <style jsx>{`
        .scroll-container::-webkit-scrollbar {
            width: 8px;
        }
        .scroll-container::-webkit-scrollbar-track {
            background: #27272a; /* zinc-800 */
        }
        .scroll-container::-webkit-scrollbar-thumb {
            background: #f97316; /* orange-500 */
            border-radius: 4px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #ea580c; /* orange-600 */
        }
    `}</style>
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        {/* Add New Dish Card */}
                        <div
                            onClick={() => setShowAddModal(true)}
                            className="w-64 h-80 bg-zinc-800/50 rounded-xl border-2 border-dashed border-orange-500/30 
               flex flex-col items-center justify-center cursor-pointer transition-all duration-300
               hover:border-orange-500 hover:bg-zinc-800/80"
                        >
                            <div className="text-center text-orange-500 transition-transform hover:scale-110">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="text-lg font-medium">Add new dish</p>
                            </div>
                        </div>

                        {/* Menu Items */}
                        {filteredItems.map(item => (

                            <div key={item.id} className="w-64 h-80 bg-zinc-800 rounded-xl border border-zinc-700 relative group transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 hover:cursor-pointer rounded-full bg-zinc-900/80 hover:bg-red-500/20"
                                    >
                                        <img src="/delete.png" className="w-5 h-5" alt="delete menu item" />
                                    </button>
                                </div>

                                <img
                                    src={item.imageFilename ? `http://localhost:8080/api/uploads/images/${item.imageFilename}` : '/apple.jpeg'}
                                    alt={item.name}
                                    className="w-40 h-36 mx-auto mt-6 rounded-full border-2 border-zinc-700 object-cover transition-transform group-hover:scale-105"
                                />

                                <div className="text-center mt-6 px-4">
                                    <p className="text-white text-lg font-semibold truncate">{item.name}</p>
                                    <p className="text-orange-400 text-md font-bold mt-2">${item.price.toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setCurrentItem(item);
                                        setShowEditModal(true);
                                    }}
                                    className="absolute bottom-0 w-full py-4 bg-zinc-900/90 backdrop-blur-sm rounded-b-xl 
                 flex items-center justify-center hover:cursor-pointer gap-2 text-orange-400 font-medium
                 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                                        />
                                    </svg>
                                    Edit dish
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                
                <div className="flex justify-start space-x-6 mt-8">
                    <button
                        onClick={() => setHasChanges(false)}
                        className="px-8 py-3 bg-zinc-800 text-orange-400 text-base font-medium rounded-lg
                 border border-orange-500/30 hover:cursor-pointer transition-all duration-300
                 hover:border-orange-500 hover:bg-orange-500/10"
                    >
                        Discard Changes
                    </button>
                    <button
                        onClick={() => setHasChanges(false)}
                        className="px-8 py-3 bg-orange-500 text-white text-base font-medium rounded-lg
                 transition-all duration-300 hover:cursor-pointer hover:bg-orange-600 disabled:opacity-50
                 disabled:cursor-not-allowed shadow-lg shadow-orange-500/10"
                        disabled={!hasChanges}
                    >
                        Save Changes
                    </button>
                </div>

                {/* Add Modal */}
                {showAddModal && (
                    <AddModal
                        categories={categories}
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
                        categories={categories}
                        item={currentItem}
                        onClose={() => setShowEditModal(false)}
                        onSave={(updatedItem) => {
                            setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
                            setHasChanges(true);
                        }}
                    />
                )}
                {showCategoryModal && (
                    <CategoryModal
                        categories={categories}
                        onClose={() => setShowCategoryModal(false)}
                        onAdd={handleAddCategory}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
                )}
            </div>
        </div>
    );
};

// Add Modal Component
const AddModal = ({ onClose, onSave, categories }) => {
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
            //console.log('adding item', data);
            const response = await api.post('/menu', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status !== 200) {
                throw new Error('Failed to add item');
            } else {
                alert('Item added successfully');
                console.log('Item added successfully:', response.data);
            }
            //console.log('response',response);
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-800 p-8 rounded-xl w-[480px] shadow-xl border border-zinc-700">
                <h2 className="text-white text-2xl font-semibold mb-6">Add New Dish</h2>
                <div className="space-y-5">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
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
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <div className="flex justify-end space-x-4 mt-8">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2.5 rounded-lg border border-zinc-600 text-zinc-400 
                             hover:text-white hover:cursor-pointer hover:border-zinc-500 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            className="px-6 py-2.5 rounded-lg bg-orange-500 text-white
                             hover:bg-orange-600 hover:cursor-pointer transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ...existing code...

// ...existing code...

const CategoryModal = ({ categories, onClose, onAdd, onEdit, onDelete }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            onEdit(editId, formData);
        } else {
            onAdd(formData);
        }
        setFormData({ name: '', description: '' });
        setEditId(null);
    };

    const handleEditClick = (cat) => {
        setEditId(cat.id);
        setFormData({ name: cat.name, description: cat.description });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 p-6 rounded-lg w-96">
                <h2 className="text-white text-xl font-semibold mb-4">Manage Categories</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-900 text-white"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-900 text-white"
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 hover:cursor-pointer py-2 bg-neutral-900 text-orange-500 rounded">Close</button>
                        <button type="submit" className="px-4 hover:cursor-pointer py-2 bg-orange-500 text-white rounded">
                            {editId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <h3 className="text-white font-semibold mb-2">Categories</h3>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat.id} className="flex justify-between items-center mb-2">
                                <span>{cat.name}</span>
                                <div>
                                    <button onClick={() => handleEditClick(cat)} className="hover:cursor-pointer text-blue-400 mr-2">Edit</button>
                                    <button onClick={() => onDelete(cat.id)} className="hover:cursor-pointer text-red-400">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
// ...existing code...

// Edit Modal Component
const EditModal = ({ item, onClose, onSave, categories }) => {
    const [formData, setFormData] = useState({ ...item });

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
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-800 p-8 rounded-xl w-[480px] shadow-xl border border-zinc-700">
                <h2 className="text-white text-2xl font-semibold mb-6">Edit Dish</h2>
                <div className="space-y-5">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
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
                        className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 
                          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none
                          transition-all duration-300"
                    />
                    <div className="flex justify-end space-x-4 mt-8">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2.5 rounded-lg hover:cursor-pointer border border-zinc-600 text-zinc-400 
                             hover:text-white hover:border-zinc-500 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            className="px-6 py-2.5 rounded-lg bg-orange-500 text-white
                             hover:bg-orange-600 hover:cursor-pointer transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;