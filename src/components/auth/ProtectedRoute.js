import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Korumalı rotalar için bileşen
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Yükleniyor durumunda
  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı giriş yapmışsa alt rotaları göster
  return <Outlet />;
};

export default ProtectedRoute;
