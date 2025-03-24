import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserStore from '../stores/userStore'; // Adjust path as needed
import OTPVerification from '../components/OTPVerification'; // Your OTP component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  // Get state and actions from Zustand
  const {
    actionLogin,
    isLoading,
    otpVerificationRequired,
    otpUserEmail
  } = useUserStore();
  
  // Redirect if already logged in
  useEffect(() => {
    const user = useUserStore.getState().user;
    console.log("user...", user)
    if (user) {
      navigate('/home');
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await actionLogin({ email, password });
      
      // If no OTP required, the store will already have the token and user
      // and redirection will happen in the next useEffect render
      if (!otpVerificationRequired) {
        console.log("otpVerificationRequired...", otpVerificationRequired)
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };
  
  // If OTP verification is required, show OTP component
  if (otpVerificationRequired) {
    return <OTPVerification email={otpUserEmail} />;
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;