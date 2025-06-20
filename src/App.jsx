import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { registerServiceWorker, requestNotificationPermission, subscribeToPushNotifications } from './services/notificationService';
import './index.css';
import './admin-panel.css';

const NotificationHandler = () => {
  const { user } = useAuth();

  useEffect(() => {
    const setupNotifications = async () => {
      if (user) {
        try {
          // Service Worker'ı kaydet
          const registration = await registerServiceWorker();
          if (registration) {
            // Bildirim izni iste
            const permission = await requestNotificationPermission();
            if (permission) {
              // Push aboneliği oluştur
              await subscribeToPushNotifications(registration);
            }
          }
        } catch (error) {
          console.error('Bildirim kurulumu hatası:', error);
        }
      }
    };

    setupNotifications();
  }, [user]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NotificationHandler />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
