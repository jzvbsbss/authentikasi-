import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { showError } from '../utils/toast';
import Button from '../components/Button';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          showError('Failed to fetch user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        {user && (
          <div className="mb-6">
            <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="mb-2"><span className="font-semibold">Status:</span> {user.isVerified ? 'Verified' : 'Not Verified'}</p>
          </div>
        )}
        <div className="flex justify-center">
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
