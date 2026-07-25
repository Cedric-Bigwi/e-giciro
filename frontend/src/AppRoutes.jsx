import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import OffersPage from './pages/OffersPage';
import CreateOffer from './pages/CreateOffer';
import MyOffers from './pages/MyOffers';
import AdminPage from './pages/AdminPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-offer"
        element={
          <ProtectedRoute>
            <CreateOffer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-offers"
        element={
          <ProtectedRoute>
            <MyOffers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="container-page py-24 text-center">
            <h1 className="text-3xl font-extrabold">404</h1>
            <p className="mt-2 text-ink/50">This page doesn&apos;t exist.</p>
          </div>
        }
      />
    </Routes>
  );
}
