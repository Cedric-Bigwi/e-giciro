import React from 'react';
import OfferCard from './OfferCard';
import LoadingSpinner from '../common/LoadingSpinner';

export default function OfferList({ offers, loading, showActions = false, onEdit, onDelete }) {
  if (loading) {
    return <LoadingSpinner label="Fetching the latest offers…" />;
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="font-semibold text-ink/70">No offers match your filters yet.</p>
        <p className="mt-1 text-sm text-ink/50">Try widening your search, or check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} showActions={showActions} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
