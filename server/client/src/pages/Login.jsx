import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setAuthToken } from '../utils/auth';
import { showSuccess, showError } from '../utils/toast';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/login', formData);
      setAuthToken(response.data.token);
      showSuccess(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        showError(error.response.data.message);
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      } else {
        showError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
          />
          <div className="flex items-center justify-between mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700 text-sm">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
