import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { formatRWF, categoryLabel, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get('/admin/offers')
      .then((res) => setOffers(res.data.data.offers))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(offer) {
    if (!window.confirm(`Remove "${offer.product_name}"? This cannot be undone.`)) return;
    await api.delete(`/admin/offers/${offer.id}`);
    setOffers((prev) => prev.filter((o) => o.id !== offer.id));
  }

  if (loading) return <LoadingSpinner label="Loading offers…" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/5 text-left text-ink/50">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">District</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Posted</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id} className="border-b border-black/5 last:border-0">
              <td className="px-4 py-3 font-medium">{o.product_name}</td>
              <td className="px-4 py-3 capitalize">{o.type}</td>
              <td className="px-4 py-3">{categoryLabel(o.category)}</td>
              <td className="px-4 py-3">{formatRWF(o.price)}</td>
              <td className="px-4 py-3">{o.district}</td>
              <td className="px-4 py-3">{o.owner?.name}</td>
              <td className="px-4 py-3">{formatDate(o.created_at)}</td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => handleDelete(o)} className="text-red-600 hover:underline text-xs font-semibold">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
