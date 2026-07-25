import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/stats')
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading platform statistics…" />;
  if (!stats) return null;

  const cards = [
    { label: 'Total users', value: stats.totalUsers },
    { label: 'Total offers', value: stats.totalOffers },
    { label: 'Active offers', value: stats.activeOffers },
    { label: 'Districts covered', value: stats.districtsCovered }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="card p-5">
          <p className="text-3xl font-extrabold text-primary-600">{c.value}</p>
          <p className="mt-1 text-sm text-ink/50">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
