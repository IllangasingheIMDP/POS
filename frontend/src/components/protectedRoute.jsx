import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUser } from '../store/userSlice';
import Sidebar from './sidebar';
import './protected.css'
const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { username, role, error } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      dispatch(fetchUser());
    }

    // Set a timeout to stop loading and redirect if username isn't fetched
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [dispatch, username]);

  if (isLoading && !username) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <div className="spinner"></div>
      </div>
    );
  }

  // Redirect to login if no username or fetch error
  if (!username || error) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;