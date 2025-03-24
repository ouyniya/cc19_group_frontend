
// Finally, let's update the OTPVerification component to use Zustand
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserStore from '../stores/userStore'; // Adjust path as needed

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  // Get state and actions from Zustand
  const {
    verifyOTP,
    resendOTP,
    resetOTPState,
    isLoading,
  } = useUserStore();
  
  // Focus on first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);
  
  const handleInputChange = (index, event) => {
    const value = event.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character
    setOtp(newOtp);
    
    // Auto-focus next input field if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index, event) => {
    // Move to previous input field on backspace if current field is empty
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text');
    
    // Check if pasted content contains only numbers
    if (!/^\d+$/.test(pastedData)) return;
    
    const pastedOtp = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedOtp.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedOtp[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the next empty field or the last field if all are filled
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };
  
  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setError('');
    
    try {
      await verifyOTP(otpValue);
      // After successful verification, the user and token will be in the store
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    }
  };
  
  const handleResendOTP = async () => {
    setError('');
    setResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown
    
    try {
      await resendOTP();
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP');
      setResendDisabled(false);
      setCountdown(0);
    }
  };
  
  const handleCancel = () => {
    resetOTPState();
    navigate('/login');
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
      
      <p className="text-center mb-4">
        We've sent a 6-digit OTP to <strong>{email}</strong>
      </p>
      
      <div className="flex justify-center space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : null}
            className="w-12 h-12 text-center text-2xl border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        ))}
      </div>
      
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      
      <button
        onClick={handleVerifyOTP}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
      
      <div className="text-center mt-4">
        <p className="text-gray-600">Didn't receive the code?</p>
        <button
          onClick={handleResendOTP}
          disabled={resendDisabled || isLoading}
          className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
        >
          {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
        </button>
      </div>
      
      <div className="text-center mt-4">
        <button
          onClick={handleCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;