import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ phone_number: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.phone_number, form.password);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to log in. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-2xl font-extrabold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/50">Log in to compare prices and manage your offers.</p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="label" htmlFor="phone_number">
                Phone number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                placeholder="0788123456"
                className="input-field"
                value={form.phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="input-field"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full">
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-ink/40">
          Demo admin: 0788000000 / admin123
        </p>
      </div>
    </div>
  );
}
