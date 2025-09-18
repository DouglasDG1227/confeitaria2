import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${formData.name}.
    
${formData.message}

Contato: ${formData.email}${formData.phone ? ` | ${formData.phone}` : ''}`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/5511913277174?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpar formulário
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Endereço',
      info: 'Penha\nSão Paulo - SP'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'WhatsApp',
      info: '(11) 91327-7174'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Instagram',
      info: '@casacaramelo230'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Horário',
      info: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 16h\nDomingo: Fechado'
    }
  ];

  return (
    <section id="contato" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#ffe682] mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos prontos para atender você e criar doces especiais para seus momentos únicos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <div>
            <h3 className="text-2xl font-bold text-[#ffe682] mb-8">
              Informações de Contato
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-[#ffe682] mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 whitespace-pre-line">
                      {item.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário */}
          <div>
            <h3 className="text-2xl font-bold text-[#ffe682] mb-8">
              Envie uma Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#ffe682] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#ffe682] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#ffe682] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#ffe682] focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
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
                <Send size={20} />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
