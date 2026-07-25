import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';
import OfferFilters from '../components/offers/OfferFilters';
import OfferList from '../components/offers/OfferList';
import OfferMap from '../components/map/OfferMap';
import PriceComparison from '../components/offers/PriceComparison';

const initialFilters = { product_name: '', category: '', district: '', type: '', sort: '' };

export default function OffersPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');

  const fetchOffers = useCallback((activeFilters) => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(activeFilters).filter(([, v]) => v !== ''));
    api
      .get('/offers', { params: { ...params, limit: 30 } })
      .then((res) => setOffers(res.data.data.offers))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => fetchOffers(filters), 300);
    return () => clearTimeout(timeout);
  }, [filters, fetchOffers]);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Browse offers</h1>
          <p className="mt-1 text-sm text-ink/50">Filter by product, category, district, and price.</p>
        </div>
        <div className="inline-flex rounded-lg border border-black/10 p-1 self-start">
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition ${
              view === 'list' ? 'bg-primary-600 text-white' : 'text-ink/60'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition ${
              view === 'map' ? 'bg-primary-600 text-white' : 'text-ink/60'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      <div className="mt-6">
        <OfferFilters filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {view === 'list' ? <OfferList offers={offers} loading={loading} /> : <OfferMap offers={offers} />}
        </div>
        <div>
          <PriceComparison />
        </div>
      </div>
    </div>
  );
}
