import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? 'text-primary-600' : 'text-ink/70 hover:text-ink'}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        {user ? (
          <div className="flex items-center gap-2 cursor-default select-none">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-extrabold text-white">
              eG
            </span>
            <span className="text-lg font-extrabold tracking-tight">e-Giciro</span>
          </div>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-extrabold text-white">
              eG
            </span>
            <span className="text-lg font-extrabold tracking-tight">e-Giciro</span>
          </Link>
        )}

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/offers" className={navLinkClass}>
            Browse Offers
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {user && (
            <NavLink to="/my-offers" className={navLinkClass}>
              My Offers
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NotificationBell />
              <Link to="/create-offer" className="btn-secondary hidden sm:inline-flex">
                Post an Offer
              </Link>
              <button onClick={handleLogout} className="btn-outline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">
                Log in
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}

          <button
            className="md:hidden p-2 text-ink/70"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-black/5 px-4 py-3 flex flex-col gap-3 bg-white">
          <NavLink to="/offers" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Browse Offers
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {user && (
            <NavLink to="/my-offers" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              My Offers
            </NavLink>
          )}
          {user && (
            <NavLink to="/create-offer" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Post an Offer
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
