import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DISTRICTS, ROLES } from '../../utils/constants';

const initialForm = {
  name: '',
  phone_number: '',
  role: 'consumer',
  district: 'Kigali',
  password: '',
  confirmPassword: ''
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = form;
      await register(payload);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const messages = err.response?.data?.errors;
      setError(
        (messages && messages.join(' ')) || err.response?.data?.message || 'Unable to create your account.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="card p-8">
          <h1 className="text-2xl font-extrabold">Create your account</h1>
          <p className="mt-1 text-sm text-ink/50">
            Join consumers, shop owners, wholesalers, and manufacturers comparing prices in real time.
          </p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Aline Uwase"
                className="input-field"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
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
              <label className="label" htmlFor="role">
                I am a
              </label>
              <select id="role" name="role" className="input-field" value={form.role} onChange={handleChange}>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="district">
                District
              </label>
              <select
                id="district"
                name="district"
                className="input-field"
                value={form.district}
                onChange={handleChange}
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
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
                minLength={6}
                placeholder="At least 6 characters"
                className="input-field"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="Re-enter password"
                className="input-field"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary sm:col-span-2 mt-2 w-full">
              {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
