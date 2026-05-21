import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../../firebase/auth';
import { db } from '../../firebase/firestore';
import { Card, Input, Button } from '../../shared/ui';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Пользователь создан");

      const user = userCredential.user;

      console.log(user.uid);

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      await setDoc(doc(db, 'users', user.uid), {
  uid: user.uid,
  name: formData.name,
  email: formData.email,
  avatar: '',
  status: 'online',
  lastSeen: null,
  createdAt: serverTimestamp(),
});

console.log("Пользователь сохранен");

      navigate('/chat');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7FB] p-6">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#2D2D2D]">Create account</h1>
          <p className="mt-2 text-sm text-[#8E8E93]">Join Telegram Clone today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Name
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

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
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8E8E93]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#CDB4FF] hover:text-[#b89dff] transition"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
