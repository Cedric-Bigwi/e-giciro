import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import OfferList from '../components/offers/OfferList';
import PriceComparison from '../components/offers/PriceComparison';
import { roleLabel } from '../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const [myOffers, setMyOffers] = useState([]);
  const [recentOffers, setRecentOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/offers/mine'), api.get('/offers', { params: { limit: 3 } })])
      .then(([mineRes, recentRes]) => {
        setMyOffers(mineRes.data.data.offers);
        setRecentOffers(recentRes.data.data.offers);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-sm text-ink/50">
            {roleLabel(user.role)} · {user.district} district
          </p>
        </div>
        <Link to="/create-offer" className="btn-primary self-start">
          Post a new offer
        </Link>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Your active offers</h2>
              <Link to="/my-offers" className="text-sm font-semibold text-primary-600 hover:underline">
                Manage all
              </Link>
            </div>
            <p className="mt-1 text-sm text-ink/50">
              You have {myOffers.filter((o) => o.status === 'active').length} active offer(s) right now.
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-3">Newest on the market</h2>
            <OfferList offers={recentOffers} loading={loading} />
          </div>
        </div>

        <div>
          <PriceComparison />
        </div>
      </div>
    </div>
  );
}
