import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { fetchUser } from '../store/userSlice';
import api from '../constants/api';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       const response = await api.post('/auth/login', { username, password });
       if(response.status === 200){
        await dispatch(fetchUser()).unwrap();
        console.log(response.data);
        if(response.data.role === 'CASHIER'){
          navigate('/cashier');
        }else if(response.data.role === 'CHEF'){
          navigate('/chef');
        }else if(response.data.role === 'ADMIN'){
          navigate('/admin');
        }
       }else{
        setError('Invalid username or password');
       }
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 bg-zinc-300/50 p-8 flex flex-col items-center justify-center relative">
        <div className='z-10 flex flex-col items-center justify-center  rounded-xl p-8 bg-white/50'> 
          <h1 className=" z-10 text-4xl font-semibold text-neutral-900 font-['Montserrat']">BISTROFY</h1>
          <h2 className=" z-10 text-4xl font-normal  text-orange-400 font-['Bayon'] mt-4">WELCOME!</h2>
          </div>
          <img
            src="/login.jpg"
            alt="Bistrofy Background"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
        </div>
        <div className="w-full md:w-1/2 bg-neutral-900 p-8 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-white font-['Inria_Serif'] mb-8">Log In</h2>
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-2xl font-normal text-white font-['Kulim_Park'] mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-16 px-4 text-xl bg-transparent border border-orange-400 rounded-[35px] text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-2xl font-normal text-white font-['Kulim_Park'] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-16 px-4 text-xl bg-transparent border border-orange-400 rounded-[35px] text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full h-16 bg-orange-400 rounded-[35px] text-2xl font-bold text-black font-['Inter'] hover:bg-orange-500 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;