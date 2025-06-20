import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Zumba ile Enerjinizi Yükseltin!</h1>
            <p>
              Eğlenceli müzikler eşliğinde dans ederek formda kalın. Zumba, fitness ve eğlenceyi bir araya getiren en iyi dans fitness programıdır.
            </p>
            {!user && (
              <div className="cta-buttons">
                <a href="/register" className="cta-button primary">Hemen Başla</a>
                <a href="/login" className="cta-button secondary">Giriş Yap</a>
              </div>
            )}
          </div>
        </section>

        <section className="features-section">
          <h2>Neden Zumba?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💃</div>
              <h3>Eğlenceli Fitness</h3>
              <p>Dans ederek egzersiz yapın, sıkıcı rutinlere veda edin!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Kalori Yakımı</h3>
              <p>Tek bir seansta 500-800 kalori yakabilirsiniz.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Enerji Artışı</h3>
              <p>Gün boyu enerjik hissedin ve motivasyonunuzu artırın.</p>
            </div>
          </div>
        </section>

        {user && (
          <section className="welcome-section">
            <h2>Hoş Geldiniz, {user.user_metadata?.first_name || 'Değerli Üyemiz'}!</h2>
            <p>
              Zumba uygulamasına giriş yaptınız. Düzenli bildirimlerimizle yeni içeriklerden ve etkinliklerden haberdar olacaksınız.
            </p>
            <div className="notification-info">
              <p>
                <strong>Not:</strong> Web bildirimleri almak için tarayıcı izinlerini etkinleştirmeyi unutmayın.
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
