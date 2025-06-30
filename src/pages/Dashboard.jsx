import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useClasses from '../hooks/useClasses';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { classes, addClass } = useClasses();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('zumbaUser'));
      if (storedUser?.email) {
        setEmail(storedUser.email);
      }
    } catch (e) {
      console.error('Failed to load user', e);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !duration) return;
    addClass({ name, date, duration });
    setName('');
    setDate('');
    setDuration('');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <Header />
      <main className="dashboard-content">
        <h2>Hoş geldin, {email}</h2>

        <section className="classes-list">
          <h3>Mevcut Dersler</h3>
          {classes.length > 0 ? (
            <ul>
              {classes.map((cls, idx) => (
                <li key={idx}>
                  {cls.name} - {cls.date} - {cls.duration} dk
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz ders eklenmedi.</p>
          )}
        </section>

        <section className="add-class-form">
          <h3>Yeni Ders Ekle</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Ders Adı
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Tarih
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Süre (dk)
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Ekle</button>
          </form>
        </section>
        <p>
          <Link to="/">Ana Sayfaya Dön</Link>
        </p>
        <button onClick={handleGoHome}>Giriş Sayfasına Git</button>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
