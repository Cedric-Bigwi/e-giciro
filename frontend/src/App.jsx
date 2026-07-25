import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}
