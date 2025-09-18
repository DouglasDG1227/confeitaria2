import React from 'react';
import { Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrição */}
          <div>
            <h3 className="text-2xl font-bold text-[#ffe682] mb-4">
              Casa Caramelo
            </h3>
            <p className="text-gray-300 mb-4">
              Doces finos que encantam o paladar e despertam os sentidos. 
              Criando momentos especiais desde 2015.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/casacaramelo230/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ffe682] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-[#ffe682] mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-[#ffe682] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-[#ffe682] transition-colors"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-[#ffe682] transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-[#ffe682] transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Informações de contato */}
          <div>
            <h4 className="text-lg font-semibold text-[#ffe682] mb-4">
              Contato
            </h4>
            <div className="space-y-2 text-gray-300">
              <p>Penha</p>
              <p>São Paulo - SP</p>
              <p>WhatsApp: (11) 91327-7174</p>
              <p>Instagram: @casacaramelo230</p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Casa Caramelo. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
              Feito com <Heart className="w-4 h-4 mx-1 text-red-500" /> para você
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
