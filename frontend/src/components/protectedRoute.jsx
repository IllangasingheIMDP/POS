import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUser } from '../store/userSlice';

const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (!username) {
      dispatch(fetchUser());
    }
  }, [dispatch, username]);

  if (!username) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;