import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import OfferForm from '../components/offers/OfferForm';

export default function CreateOffer() {
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    await api.post('/offers', payload);
    navigate('/my-offers');
  }

  return (
    <div className="container-page py-10 max-w-2xl">
      <h1 className="text-2xl font-extrabold">Post a new offer</h1>
      <p className="mt-1 text-sm text-ink/50">Tell the market what you&apos;re buying or selling.</p>
      <div className="mt-6">
        <OfferForm onSubmit={handleSubmit} submitLabel="Post offer" />
      </div>
    </div>
  );
}
