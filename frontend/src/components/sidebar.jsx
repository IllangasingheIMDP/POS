import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate=useNavigate()
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  const sidebarItems = {
    ADMIN: [
      { icon: '/dashboardIcon.svg', text: 'Dashboard', link: '/admin' },
      { icon: '/menuIcon.svg', text: 'Menu manage', link: '/admin/menu' },
      { icon: '/staffIcon.svg', text: 'Staff manage', link: '/admin/staff' },
      { icon: '/Inventory.svg', text: 'Inventory', link: '/admin/inventory' },
      { icon: '/reservationIcon.svg', text: 'Reservations', link: '/admin/reservation' },
      { icon: '/reportAnalyticsIcon.svg', text: 'Report Analytics', link: '#' },
      
      { icon: '/notification.svg', text: 'Notifications', link: '#' },
      { icon: '/settings.svg', text: 'Setting', link: '#' },
      { icon: '/logout.svg', text: 'logout', link: '#' },
    ],
    CASHIER: [
      { icon: '/dashboardIcon.svg', text: 'Dashboard', link: '/cashier' },
      { icon: '/orderIcon.svg', text: 'Orders', link: '#' },
      { icon: '/menuIcon.svg', text: 'Menu', link: '#' },
      { icon: '/reservationIcon.svg', text: 'Reservation', link: '#' },
      { icon: '/Inventory.svg', text: 'Inventory', link: '#' },
      { icon: '/staffSchedule.svg', text: 'Staff Schedule', link: '#' },
      { icon: '/cusfeedbackIcon.svg', text: 'Customer Feedback', link: '#' },
      { icon: '/helpIcon.svg', text: 'Help and Support', link: '#' },
      { icon: '/logout.svg', text: 'logout', link: '#' },
    ],
    CHEF: [
       { icon: '/dashboardIcon.svg', text: 'Dashboard', link: '/chef' },
      { icon: '/orderIcon.svg', text: 'Ongoing Orders', link: '#' },
      { icon: '/completedOrdersIcon.svg', text: 'Completed Orders', link: '#' },
      { icon: '/newOrdersIcon.svg', text: 'New Orders', link: '#' },
      { icon: '/menuStorageIcon.svg', text: 'Menu Storage', link: '#' },
      { icon: '/InventoryStorage.svg', text: 'Inventory Storage', link: '#' },
      { icon: '/notification.svg', text: 'Notifications', link: '#' },
      { icon: '/logout.svg', text: 'logout', link: '#' },
    ],
  };

  const items = sidebarItems[role] || [];
  const [activeItem, setActiveItem] = useState(items[0]?.text || '');

  return (
    <div className="w-72 bg-[#141E20] py-4 pl-4 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/logo.png" alt="logo" className="w-11 h-11 mr-2" />
        <h1 className="text-2xl font-semibold">BISTROFY</h1>
      </div>
      <nav className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-2 py-3 cursor-pointer ${
              activeItem === item.text ? 'bg-[#0B161A] rounded-l-3xl' : ''
            }`}
            onClick={() => {
              if (item.text === 'logout') {
                dispatch(logout());
              } else {
                navigate(item.link)
                setActiveItem(item.text);
              }
            }}
          >
            <img src={item.icon} alt={item.text} className={`w-7 h-7 mr-2 text-purple-500` } />
            <span
              className={
                activeItem === item.text
                  ? 'text-orange-400 text-shadow-md text-shadow-orange-800'
                  : ''
              }
            >
              {item.text}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;