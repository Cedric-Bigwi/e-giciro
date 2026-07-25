import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import OfferList from '../components/offers/OfferList';
import OfferForm from '../components/offers/OfferForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null);

  function load() {
    setLoading(true);
    api
      .get('/offers/mine')
      .then((res) => setOffers(res.data.data.offers))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(offer) {
    if (!window.confirm(`Delete "${offer.product_name}"? This cannot be undone.`)) return;
    await api.delete(`/offers/${offer.id}`);
    setOffers((prev) => prev.filter((o) => o.id !== offer.id));
  }

  async function handleUpdate(payload) {
    const res = await api.put(`/offers/${editingOffer.id}`, payload);
    setOffers((prev) => prev.map((o) => (o.id === editingOffer.id ? res.data.data.offer : o)));
    setEditingOffer(null);
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-extrabold">My offers</h1>
      <p className="mt-1 text-sm text-ink/50">Manage the offers you&apos;ve posted to the market.</p>

      {editingOffer && (
        <div className="mt-6 max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Editing: {editingOffer.product_name}</h2>
            <button onClick={() => setEditingOffer(null)} className="text-sm text-ink/50 hover:underline">
              Cancel
            </button>
          </div>
          <OfferForm
            initialValues={{
              type: editingOffer.type,
              product_name: editingOffer.product_name,
              category: editingOffer.category,
              price: editingOffer.price,
              description: editingOffer.description || '',
              district: editingOffer.district
            }}
            onSubmit={handleUpdate}
            submitLabel="Save changes"
          />
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <LoadingSpinner label="Loading your offers…" />
        ) : (
          <OfferList
            offers={offers}
            loading={false}
            showActions
            onEdit={(offer) => setEditingOffer(offer)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
