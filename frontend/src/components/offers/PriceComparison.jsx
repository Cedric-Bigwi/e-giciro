import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { formatRWF } from '../../utils/helpers';
import { CATEGORIES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

export default function PriceComparison() {
  const [category, setCategory] = useState('rice');
  const [averages, setAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api
      .get('/offers/averages', { params: { category } })
      .then((res) => {
        if (!ignore) setAverages(res.data.data.averages);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [category]);

  const maxAvg = Math.max(...averages.map((a) => Number(a.average_price)), 1);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Average price by district</h3>
        <select className="input-field !w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner size="sm" label="Crunching the numbers…" />
      ) : averages.length === 0 ? (
        <p className="text-sm text-ink/50 py-6 text-center">No active offers yet for this category.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {averages
            .slice()
            .sort((a, b) => Number(a.average_price) - Number(b.average_price))
            .map((row) => (
              <div key={row.district} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium shrink-0">{row.district}</span>
                <div className="flex-1 h-2.5 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-600"
                    style={{ width: `${(Number(row.average_price) / maxAvg) * 100}%` }}
                  />
                </div>
                <span className="w-28 text-right text-sm font-semibold shrink-0">
                  {formatRWF(Math.round(Number(row.average_price)))}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
