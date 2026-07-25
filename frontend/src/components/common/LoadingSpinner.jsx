import React from 'react';

export default function LoadingSpinner({ label = 'Loading…', size = 'md' }) {
  const dimension = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-ink/60">
      <div
        className={`${dimension} rounded-full border-2 border-primary-600/20 border-t-primary-600 animate-spin`}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
