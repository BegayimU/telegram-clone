import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { Card, Input, Button } from '../../shared/ui';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/chat');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7FB] p-6">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#2D2D2D]">Welcome back</h1>
          <p className="mt-2 text-sm text-[#8E8E93]">Sign in to Telegram Clone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="rounded-[16px] bg-[#FFEAEA] border border-[#FFCCCC] p-3">
              <p className="text-sm text-[#FF6B6B]">{error}</p>
            </div>
          )}

          <Button 
            className="w-full mt-6" 
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8E8E93]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#CDB4FF] hover:text-[#b89dff] transition"
            >
              Create one
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
