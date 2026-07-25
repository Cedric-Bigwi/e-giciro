import React, { useState } from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminUsers from '../components/admin/AdminUsers';
import AdminOffers from '../components/admin/AdminOffers';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'users', label: 'Users' },
  { key: 'offers', label: 'Offers' }
];

export default function AdminPage() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-extrabold">Admin dashboard</h1>
      <p className="mt-1 text-sm text-ink/50">Monitor platform health and moderate listings.</p>

      <div className="mt-6 inline-flex rounded-lg border border-black/10 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition ${
              tab === t.key ? 'bg-primary-600 text-white' : 'text-ink/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'overview' && <AdminDashboard />}
        {tab === 'users' && <AdminUsers />}
        {tab === 'offers' && <AdminOffers />}
      </div>
    </div>
  );
}
