import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/userSlice';
import api from '../constants/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.status === 200) {
        await dispatch(fetchUser()).unwrap();
        console.log(response.data);
        if (response.data.role === 'CASHIER') {
          navigate('/cashier');
        } else if (response.data.role === 'CHEF') {
          navigate('/chef');
        } else if (response.data.role === 'ADMIN') {
          navigate('/admin');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95">
      <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Panel with Image */}
        <div className="w-0 md:w-1/2 relative hidden md:block">
          <img
            src="/login.jpg"
            alt="Bistrofy Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
          
          {/* Glass card for logo */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-orange-400 tracking-wider mb-2" style={{ 
                WebkitTextStroke: '1px rgba(0,0,0,0.3)', 
                textShadow: '0 0 15px rgba(255,165,0,0.5)' 
              }}>
                WELCOME!
              </h2>
              <h1 className="text-5xl font-bold text-white tracking-tight">BISTROFY</h1>
            </div>
          </div>
        </div>
        
        {/* Right Panel with Form */}
        <div className="w-full md:w-1/2 bg-zinc-900 p-8 md:p-12 flex flex-col">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            {/* Logo for mobile */}
            <div className="md:hidden mb-12 text-center">
              <h2 className="text-3xl font-bold text-orange-400 tracking-wider mb-1">WELCOME!</h2>
              <h1 className="text-4xl font-bold text-white tracking-tight">BISTROFY</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Log In</h2>
            
            <form onSubmit={handleLogin} className="space-y-6 w-full">
              <div className="space-y-2">
                <label 
                  htmlFor="username"
                  className="block text-lg font-medium text-zinc-300"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-14 pl-5 pr-12 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-zinc-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-5 pr-12 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 rounded-xl text-lg font-semibold text-white shadow-lg hover:shadow-orange-500/30 transition-all duration-200 relative overflow-hidden group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Login</span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </>
                )}
              </button>
              
              <div className="pt-4 text-center">
                <p className="text-zinc-500 text-sm">
                  © 2025 Bistrofy. All rights reserved.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;