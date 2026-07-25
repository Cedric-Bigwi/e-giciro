import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { roleLabel, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get('/admin/users')
      .then((res) => setUsers(res.data.data.users))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(user) {
    if (!window.confirm(`Remove ${user.name}'s account? This cannot be undone.`)) return;
    await api.delete(`/admin/users/${user.id}`);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  }

  if (loading) return <LoadingSpinner label="Loading users…" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/5 text-left text-ink/50">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">District</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-black/5 last:border-0">
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3">{u.phone_number}</td>
              <td className="px-4 py-3">{roleLabel(u.role)}</td>
              <td className="px-4 py-3">{u.district}</td>
              <td className="px-4 py-3">{formatDate(u.created_at)}</td>
              <td className="px-4 py-3 text-right">
                {u.role !== 'admin' && (
                  <button onClick={() => handleDelete(u)} className="text-red-600 hover:underline text-xs font-semibold">
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
