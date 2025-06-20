import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; {currentYear} Zumba App. Tüm hakları saklıdır.</p>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Gizlilik Politikası</a>
          <a href="#" className="footer-link">Kullanım Şartları</a>
          <a href="#" className="footer-link">İletişim</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
