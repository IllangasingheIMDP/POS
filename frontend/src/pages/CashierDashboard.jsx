import React, { useState, useEffect } from 'react';
import api from '../constants/api';

// Define AddMenuModal outside CashierDashboard
const AddMenuModal = ({ show, onClose, form, setForm, categories, onSubmit }) => {
  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1d2b2f] rounded-xl p-8 w-[500px] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Menu Item</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-400 mb-2">Item Name</label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleInputChange}
              className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-400 mb-2">Price (LKR)</label>
            <input
              type="number"
              value={form.price}
              onChange={handleInputChange}
              name="price"
              className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-gray-400 mb-2">Category</label>
            <select
              value={form.categoryId}
              onChange={handleInputChange}
              name="categoryId"
              className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={handleInputChange}
              name="description"
              className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none h-24 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-400 mb-2">Image</label>
            <input
              type="file"
              onChange={handleInputChange}
              name="image"
              className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
              accept="image/*"
            />
            {form.image && (
              <p className="text-gray-400 mt-1">Selected: {form.image.name}</p>
            )}
          </div>

          {/* Available Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.available}
              onChange={handleInputChange}
              name="available"
              className="w-5 h-5 rounded border-gray-700 text-orange-500 focus:ring-orange-500"
            />
            <label className="ml-2 text-gray-400">Available</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

const CashierDashboard = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [menuItemForm, setMenuItemForm] = useState({
    name: '',
    price: '',
    categoryId: '',
    description: '',
    available: true,
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    todayOrders: 0,
    pendingOrders: 0,
    totalReservations: 0,
    inventoryAlerts: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders();
    fetchReservations();
    fetchInventoryAlerts();
    fetchCategories();
  }, []);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      console.log('Orders:', response.data);
      setOrders(response.data);
      calculatePopularDishes(response.data);

      const today = new Date().toISOString().split('T')[0];
      const todayOrders = response.data.filter(order =>
        order.createdTime.split('T')[0] === today
      );
      const pendingOrders = response.data.filter(order =>
        order.status === 'PENDING'
      );

      setDashboardStats(prev => ({
        ...prev,
        todayOrders: todayOrders.length,
        pendingOrders: pendingOrders.length
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      console.log('Reservations:', response.data);
      setReservations(response.data);

      const today = new Date().toISOString().split('T')[0];
      const todayReservations = response.data.filter(reservation =>
        reservation.date === today
      );

      setDashboardStats(prev => ({
        ...prev,
        totalReservations: todayReservations.length
      }));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // Fetch inventory alerts
  const fetchInventoryAlerts = async () => {
    try {
      const response = await api.get('/inventory');
      const lowStockItems = response.data.filter(item => item.quantity <= item.threshold);
      setInventoryAlerts(lowStockItems);
      
      setDashboardStats(prev => ({
        ...prev,
        inventoryAlerts: lowStockItems.length
      }));
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle new reservation
  const handleAddReservation = async (reservationData) => {
    try {
      await api.post('/reservations', reservationData);
      fetchReservations();
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  // Handle order status update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put('/orders/status', { orderId, status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Handle menu item creation
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', menuItemForm.name);
      formData.append('price', menuItemForm.price);
      formData.append('categoryId', menuItemForm.categoryId);
      formData.append('description', menuItemForm.description);
      formData.append('available', menuItemForm.available);
      if (menuItemForm.image) {
        formData.append('image', menuItemForm.image);
      }
      //console.log('Form Data:', formData);
      await api.post('/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Menu item added successfully!');
      setShowAddMenuModal(false);
      setMenuItemForm({
        name: '',
        price: '',
        categoryId: '',
        description: '',
        available: true,
        image: null
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  // Calculate popular dishes
  const calculatePopularDishes = (orders) => {
    const dishCount = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        const dishName = item.dish || item.itemName;
        dishCount[dishName] = (dishCount[dishName] || 0) + (item.quantity || 1);
      });
    });

    const sortedDishes = Object.entries(dishCount)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setPopularDishes(sortedDishes);
  };

  // Summary cards data
  const summaryCards = [
    { title: "TODAY'S ORDERS", value: dashboardStats.todayOrders.toString(), subtext: "Orders Completed" },
    { title: "PENDING ORDERS", value: dashboardStats.pendingOrders.toString(), subtext: "Need Attention" },
    { title: "RESERVATIONS", value: dashboardStats.totalReservations.toString(), subtext: "Today's Bookings" },
    { title: "POPULAR DISHES", chart: true }
  ];

  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className='flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
      <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-['Inter'] text-white mb-2">Cashier Dashboard</h1>
            <p className="text-base text-gray-400 font-medium">{formattedDate}</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-[#1d2b2f] py-2 px-4 rounded-lg shadow-lg">
              <span className="text-xl font-medium mr-4 text-white">John Doe</span>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">👤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-lg font-semibold text-gray-300">{card.title}</h2>
              {card.chart ? (
                <div className="flex flex-col h-full">
                  <div className="flex space-x-3 mt-4 items-end h-24 justify-between px-2">
                    {popularDishes.map((dish, i) => (
                      <div key={i} className="flex flex-col items-center w-1/6">
                        <div
                          className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm hover:from-orange-500 hover:to-orange-300 transition-all duration-300"
                          style={{
                            height: `${(dish.quantity / Math.max(...popularDishes.map(d => d.quantity))) * 80}px`
                          }}
                        />
                        <div className="text-xs text-gray-400 mt-2 rotate-45 origin-left truncate">
                          {dish.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-4xl font-bold text-white mt-2">{card.value}</p>
                  {card.subtext && <p className="text-sm text-gray-400 mt-1">{card.subtext}</p>}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { title: "ADD MENU ITEM", icon: "➕", onClick: () => setShowAddMenuModal(true) },
            { title: "ADD RESERVATION", icon: "📅", onClick: () => {/* your reservation handler */} }
          ].map((button, index) => (
            <div key={index} className="bg-[#1d2b2f] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <button 
                onClick={button.onClick}
                className="w-full hover:cursor-pointer p-6 flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">{button.icon}</span>
                <span className="text-lg font-semibold text-orange-400">{button.title}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add the modal component */}
        <AddMenuModal
          show={showAddMenuModal}
          onClose={() => setShowAddMenuModal(false)}
          form={menuItemForm}
          setForm={setMenuItemForm}
          categories={categories}
          onSubmit={handleAddMenuItem}
        />

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <h2 className="text-2xl font-semibold text-orange-400 text-center mb-4">Update Inventory</h2>
            <div className="space-y-4">
              {/* Add inventory content here */}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Staff on Shift</h2>
              <div className="flex justify-center space-x-4">
                {[1, 2, 3].map((staff, index) => (
                  <div key={index} className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="px-3 py-1 bg-[#243236] rounded-full">
                        <span className="text-xs text-gray-300">Chef {staff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Inventory Alerts</h2>
              <div className="space-y-3">
                {inventoryAlerts.length > 0 ? (
                  inventoryAlerts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-red-500/10 rounded-lg p-3 border border-red-500/20"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">⚠️</span>
                        <div>
                          <p className="text-orange-400 font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            Quantity: {item.quantity} / Threshold: {item.threshold}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        Low Stock
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    No inventory alerts at this time
                  </div>
                )}
              </div>
              {inventoryAlerts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400">
                    Total alerts: {inventoryAlerts.length} items need attention
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;