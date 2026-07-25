import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-20">
      <div className="container-page py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-extrabold text-white">
              eG
            </span>
            <span className="font-extrabold">e-Giciro</span>
          </div>
          <p className="mt-2 text-sm text-ink/50 max-w-sm">
            Bringing price transparency to Rwanda&apos;s markets — one offer at a time.
          </p>
        </div>

        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-ink/70">Platform</span>
            <Link to="/offers" className="text-ink/50 hover:text-primary-600">
              Browse Offers
            </Link>
            <Link to="/register" className="text-ink/50 hover:text-primary-600">
              Create Account
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-ink/70">Coverage</span>
            <span className="text-ink/50">8 districts across Rwanda</span>
            <span className="text-ink/50">4 market roles supported</span>
          </div>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-ink/40">
        &copy; {new Date().getFullYear()} e-Giciro. Built as part of an ALU software engineering project.
      </div>
    </footer>
  );
}
