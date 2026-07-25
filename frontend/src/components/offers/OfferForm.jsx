import React, { useState } from 'react';
import { DISTRICTS, CATEGORIES, DISTRICT_COORDS } from '../../utils/constants';

const emptyForm = {
  type: 'sell',
  product_name: '',
  category: 'rice',
  price: '',
  description: '',
  district: 'Kigali'
};

export default function OfferForm({ initialValues, onSubmit, submitLabel = 'Post offer' }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...initialValues }));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const [lat, lng] = DISTRICT_COORDS[form.district] || [];
      await onSubmit({
        ...form,
        price: Number(form.price),
        latitude: lat ?? null,
        longitude: lng ?? null
      });
    } catch (err) {
      const messages = err.response?.data?.errors;
      setError((messages && messages.join(' ')) || err.response?.data?.message || 'Unable to save this offer.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">I want to</label>
          <select name="type" className="input-field" value={form.type} onChange={handleChange}>
            <option value="sell">Sell</option>
            <option value="buy">Buy</option>
          </select>
        </div>

        <div>
          <label className="label">Category</label>
          <select name="category" className="input-field" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Product name</label>
          <input
            name="product_name"
            required
            placeholder="e.g. Kilombero Rice (100kg)"
            className="input-field"
            value={form.product_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Price (RWF)</label>
          <input
            name="price"
            type="number"
            min="0"
            required
            placeholder="e.g. 45000"
            className="input-field"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">District</label>
          <select name="district" className="input-field" value={form.district} onChange={handleChange}>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Description (optional)</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Quality, quantity available, negotiation terms, etc."
            className="input-field resize-none"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto sm:self-start">
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
