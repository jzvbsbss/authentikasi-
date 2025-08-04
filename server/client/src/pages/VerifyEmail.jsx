import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { showSuccess, showError } from '../utils/toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.get(`/verify-email?token=${token}`);
        setMessage(response.data.message);
        setIsVerified(true);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Failed to verify email');
        }
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>
        <p className="text-center mb-6">{message}</p>
        {isVerified && (
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
