import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-20">
      <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-extrabold text-white">
            eG
          </span>
          <span className="font-extrabold">e-Giciro</span>
        </div>
        <p className="text-xs text-ink/40">&copy; {new Date().getFullYear()} e-Giciro. All rights reserved.</p>
      </div>
    </footer>
  );
}
