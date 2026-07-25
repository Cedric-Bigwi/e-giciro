import React from 'react';
import { formatRWF, timeAgo, categoryLabel } from '../../utils/helpers';

export default function OfferCard({ offer, onEdit, onDelete, showActions = false }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={offer.type === 'sell' ? 'badge-sell' : 'badge-buy'}>
            {offer.type === 'sell' ? 'Selling' : 'Buying'}
          </span>
          <h3 className="mt-2 font-bold text-lg leading-tight">{offer.product_name}</h3>
          <p className="text-xs text-ink/50">{categoryLabel(offer.category)}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-extrabold text-primary-600">{formatRWF(offer.price)}</p>
        </div>
      </div>

      {offer.description && <p className="text-sm text-ink/70 line-clamp-3">{offer.description}</p>}

      <div className="flex items-center justify-between text-xs text-ink/50 pt-2 border-t border-black/5">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
            />
            <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {offer.district}
        </span>
        <span>{timeAgo(offer.created_at)}</span>
      </div>

      {offer.owner && (
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span>{offer.owner.name}</span>
          <span>{offer.owner.phone_number}</span>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onEdit(offer)} className="btn-outline flex-1 !py-1.5 !text-xs">
            Edit
          </button>
          <button onClick={() => onDelete(offer)} className="btn-danger flex-1 !py-1.5 !text-xs">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
