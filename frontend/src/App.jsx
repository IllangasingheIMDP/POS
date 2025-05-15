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
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute allowedRoles={['CASHIER', 'ADMIN']} />}>
        <Route path="/cashier" element={<CashierDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['CHEF', 'ADMIN']} />}>
        <Route path="/chef" element={<ChefDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/staff" element={<StaffManage />} />

      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      
    </Routes>
  );
}

export default App;