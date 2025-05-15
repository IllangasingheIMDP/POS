import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaBox,
  FaCalendarCheck,
  FaChartBar,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaFileInvoice,
  FaCalendarAlt,
  FaComments,
  FaQuestionCircle,
  FaHourglassHalf,
  FaCheckCircle,
  FaPlusCircle,
  FaBook,
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  const sidebarItems = {
    ADMIN: [
      { icon: FaHome, text: 'Dashboard', link: '/admin' },
      { icon: FaUtensils, text: 'Menu manage', link: '/admin/menu' },
      { icon: FaUsers, text: 'Staff manage', link: '/admin/staff' },
      { icon: FaBox, text: 'Inventory', link: '/admin/inventory' },
      { icon: FaCalendarCheck, text: 'Reservations', link: '/admin/reservation' },
      { icon: FaChartBar, text: 'Report Analytics', link: '#' },
      { icon: FaBell, text: 'Notifications', link: '#' },
      { icon: FaCog, text: 'Setting', link: '#' },
      { icon: FaSignOutAlt, text: 'logout', link: '#' },
    ],
    CASHIER: [
      { icon: FaHome, text: 'Dashboard', link: '/cashier' },
      { icon: FaShoppingCart, text: 'Orders', link: '/cashier/order' },
      { icon: FaFileInvoice, text: 'Invoices', link: '/cashier/billing' },
      { icon: FaCalendarCheck, text: 'Reservation', link: '/cashier/reservation' },
      { icon: FaBox, text: 'Inventory', link: '#' },
      { icon: FaCalendarAlt, text: 'Staff Schedule', link: '#' },
      { icon: FaComments, text: 'Customer Feedback', link: '#' },
      { icon: FaQuestionCircle, text: 'Help and Support', link: '#' },
      { icon: FaSignOutAlt, text: 'logout', link: '#' },
    ],
    CHEF: [
      { icon: FaHome, text: 'Dashboard', link: '/chef' },
      { icon: FaHourglassHalf, text: 'Ongoing Orders', link: '#' },
      { icon: FaCheckCircle, text: 'Completed Orders', link: '#' },
      { icon: FaPlusCircle, text: 'New Orders', link: '#' },
      { icon: FaBook, text: 'Menu Storage', link: '#' },
      { icon: FaBox, text: 'Inventory Storage', link: '#' },
      { icon: FaBell, text: 'Notifications', link: '#' },
      { icon: FaSignOutAlt, text: 'logout', link: '#' },
    ],
  };

  const items = sidebarItems[role] || [];
  const [activeItem, setActiveItem] = useState(items[0]?.text || '');

  useEffect(() => {
    const currentItem = items.find((item) => item.link === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.text);
    } else {
      setActiveItem(items[0]?.text || '');
    }
  }, [location.pathname, items]);

  return (
    <div className="w-[80px] hover:w-72 min-h-screen bg-[#141E20] py-4 pl-4 transition-all duration-300 ease-in-out group">
      <div className="flex items-center mb-6">
        <img src="/logo.png" alt="logo" className="w-11 h-11 mr-2" />
        <h1 className="text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          BISTROFY
        </h1>
      </div>
      <nav className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center pl-5 py-3 cursor-pointer ${
                activeItem === item.text ? 'bg-[#0B161A] rounded-l-3xl' : ''
              }`}
              onClick={() => {
                if (item.text === 'logout') {
                  dispatch(logout());
                } else {
                  navigate(item.link);
                  setActiveItem(item.text);
                }
              }}
            >
              <Icon
                className={`w-5 h-5 mr-2 flex-shrink-0 ${
                  activeItem === item.text ? 'text-orange-400' : 'text-white'
                }`}
              />
              <span
                className={`${
                  activeItem === item.text
                    ? 'text-orange-400 text-shadow-md text-shadow-orange-800'
                    : 'text-white'
                } opacity-0 text-sm group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;