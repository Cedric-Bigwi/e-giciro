import React from 'react';
import { DISTRICTS, CATEGORIES } from '../../utils/constants';

export default function OfferFilters({ filters, onChange, onReset }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="card p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
      <div className="col-span-2 sm:col-span-1 lg:col-span-2">
        <label className="label">Product</label>
        <input
          className="input-field"
          placeholder="e.g. Kilombero Rice"
          value={filters.product_name}
          onChange={(e) => update('product_name', e.target.value)}
        />
      </div>

      <div>
        <label className="label">Category</label>
        <select className="input-field" value={filters.category} onChange={(e) => update('category', e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">District</label>
        <select className="input-field" value={filters.district} onChange={(e) => update('district', e.target.value)}>
          <option value="">All</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Type</label>
        <select className="input-field" value={filters.type} onChange={(e) => update('type', e.target.value)}>
          <option value="">Buy &amp; Sell</option>
          <option value="sell">Selling</option>
          <option value="buy">Buying</option>
        </select>
      </div>

      <div>
        <label className="label">Sort by</label>
        <select className="input-field" value={filters.sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className="col-span-2 sm:col-span-3 lg:col-span-6 flex justify-end">
        <button onClick={onReset} className="btn-outline !py-1.5 !text-xs">
          Reset filters
        </button>
      </div>
    </div>
  );
}
