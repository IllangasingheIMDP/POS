import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect when countdown reaches 0
    if (countdown === 0) {
      navigate('/login');
    }

    // Cleanup timer
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B161A] text-white p-8">
      <div className="bg-[#1d2b2f] p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="text-orange-500 text-6xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold font-['Montserrat'] mb-4">Unauthorized Access</h1>
        <p className="text-gray-400 mb-2">You do not have permission to view this page.</p>
        <p className="text-gray-400 mb-6">Please login to continue.</p>
        <div className="text-orange-400 font-medium">
          Redirecting to login in {countdown} seconds...
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;