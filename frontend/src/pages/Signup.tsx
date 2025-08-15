import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', fullName: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.post('/auth/signup', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      nav('/');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Sign up failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded-xl p-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border rounded-xl p-2"
          placeholder="Full Name"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <input
          className="w-full border rounded-xl p-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <p className="text-xs text-gray-500">
          Password must be at least 8 characters and include a letter, number, and special character.
        </p>
        <button className="w-full bg-black text-white rounded-xl p-2">Sign up</button>
      </form>
      <p className="text-sm mt-3">Already have an account? <Link className="underline" to="/signin">Sign in</Link></p>
    </div>
  );
}
