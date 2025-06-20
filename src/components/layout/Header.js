import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Zumba App</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Ana Sayfa</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/profile">Profilim</Link>
                </li>
                {/* Admin kontrolü burada yapılabilir */}
                <li>
                  <Link to="/admin">Admin Panel</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="auth-buttons">
          {user ? (
            <button onClick={handleSignOut} className="sign-out-button">
              Çıkış Yap
            </button>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">
                Giriş Yap
              </Link>
              <Link to="/register" className="register-link">
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
