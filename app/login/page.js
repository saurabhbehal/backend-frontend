// login.js
"use client"
import { useState } from 'react';
import { isAuthenticated } from '../utils/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'saurabhbehal@gmail.com' && password === '495830fd0fm809345m809dfg809548mdg984') {
      // Set isLoggedIn to true in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to main page
      window.location.href = '/gsgsfgsfhsjgfdfhdfghdjdghjdjghjfghkjfhgm';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='bg-white'>
    <h1 className='absolute text-black text-center uppercase mt-11 ml-[500px] text-[30px] font-bold' >Design Indian Homes Dashboard</h1>
    <div className="flex justify-center items-center h-screen bg-white">
      
      <form onSubmit={handleSubmit} className="bg-gray-300 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;