import React from 'react';
import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Feito com Amor',
      description: 'Cada doce é preparado com carinho e dedicação, seguindo receitas tradicionais da família.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas ingredientes selecionados e de primeira qualidade em todos os nossos produtos.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tradição Familiar',
      description: 'Nossa confeitaria é resultado de gerações de conhecimento e paixão pela arte da confeitaria.'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffe682' }}>
              Nossa História
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              A Casa Caramelo nasceu do sonho de criar doces que despertam sorrisos e momentos especiais. 
              Fundada em 2015, nossa confeitaria combina técnicas tradicionais com inovação, 
              sempre priorizando a qualidade e o sabor autêntico.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Cada produto é uma obra de arte comestível, criada com ingredientes cuidadosamente 
              selecionados e muito amor. Nossa missão é transformar ocasiões simples em momentos 
              inesquecíveis através dos nossos doces únicos.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4"
                >
                  <div style={{ color: '#ffe682' }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#ffe682' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden inline-block">
              <img
                src="/donos_casa_caramelo.jpg"
                alt="Donos da Casa Caramelo"
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: '500px' }}
              />
            </div>
            <div 
              className="absolute -bottom-6 -left-6 p-6 rounded-lg"
              style={{
                backgroundColor: '#ffe682',
                color: '#2d1810'
              }}
            >
              <div className="text-2xl font-bold">8+</div>
              <div className="text-sm">Anos de experiência</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
