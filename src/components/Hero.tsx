import React from 'react';
import '../styles/liquid-glass-buttons.css';

export const Hero: React.FC = () => (
  <section className="w-full h-screen flex flex-col items-center justify-center bg-[#111] text-center">
    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6">
      Emre Eker – Zumba Üye Takip
    </h1>
    <div className="space-x-4 flex flex-col md:flex-row gap-4">
      <button className="liquid-glass-btn">Giriş Yap</button>
      <button className="liquid-glass-btn">Kayıt Ol</button>
    </div>
  </section>
);

export default Hero;
