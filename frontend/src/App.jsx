import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProtectedRoute from './components/protectedRoute';
import CashierDashboard from './pages/CashierDashboard';
import ChefDashboard from './pages/ChefDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import { fetchUser } from './store/userSlice';
import MenuManagement from './pages/admin/menuManage';
import StaffManage from './pages/admin/staffManage';
import Login from './pages/login';
import InventoryManagement from './pages/admin/inventoryManage';
import Reservation from './pages/admin/reservation';
import OrderManage from './pages/cashier/orderManage';
import BillingManage from './pages/cashier/billingManage';
import CashierReservation from './pages/cashier/CashierReservation';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute allowedRoles={['CASHIER']} />}>
        <Route path="/cashier" element={<CashierDashboard />} />
        <Route path="/cashier/order" element={<OrderManage />} />
        <Route path="/cashier/billing" element={<BillingManage />} />
        <Route path="/cashier/reservation" element={<CashierReservation />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['CHEF']} />}>
        <Route path="/chef" element={<ChefDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/staff" element={<StaffManage />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/admin/reservation" element={<Reservation />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      
    </Routes>
  );
}

export default App;