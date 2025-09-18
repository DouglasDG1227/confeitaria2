import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const Header = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappNumber = '5511913277174';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold" style={{ color: '#ffe682' }}>
          Casa Caramelo
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <button 
            onClick={() => scrollToSection('inicio')}
            className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('produtos')}
            className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Produtos
          </button>
          <button 
            onClick={() => scrollToSection('sobre')}
            className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Sobre Nós
          </button>
          <button 
            onClick={() => scrollToSection('contato')}
            className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Contato
          </button>
          {/* Link discreto para admin */}
          <button 
            onClick={onAdminClick}
            className="text-xs text-gray-400 transition-colors opacity-50 hover:opacity-100"
            style={{ 
              '&:hover': { color: '#ffe682' }
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffe682';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#9ca3af';
            }}
            title="Área Administrativa"
          >
            •
          </button>
          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center space-x-2"
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
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-[#ffe682] transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('produtos')}
              className="text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              Contato
            </button>
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center space-x-2 justify-center"
              style={{
                backgroundColor: '#ffe682',
                color: '#2d1810'
              }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
