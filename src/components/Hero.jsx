import React from 'react';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/casa_caramelo_hero_banner.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`
      }}
    >
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Casa Caramelo
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Doces finos que encantam o paladar e despertam os sentidos
        </p>
        <button 
          onClick={scrollToProducts}
          className="px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: '#ffe682',
            color: '#2d1810'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ffd93d';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffe682';
          }}
        >
          Conheça nossos produtos
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
};

export default Hero;
