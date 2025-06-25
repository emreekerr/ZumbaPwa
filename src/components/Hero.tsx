import React from 'react';
import NeonButton from './NeonButton';

const Hero: React.FC = () => (
  <section className="w-full h-screen flex flex-col items-center justify-center bg-[#1E2A38]">
    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6">
      Emre Eker – Zumba Üye Takip
    </h1>
    <div className="space-x-4">
      <NeonButton color="orange">Başvur</NeonButton>
      <NeonButton color="yellow">Ders Takvimi</NeonButton>
      <NeonButton color="green">İletişim</NeonButton>
    </div>
  </section>
);

export default Hero;
