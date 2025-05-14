import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-8 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold font-['Montserrat']">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <button
        onClick={() => dispatch(logout())}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;