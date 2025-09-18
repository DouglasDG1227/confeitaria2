import React from 'react';
import { Plus } from 'lucide-react';

const Products = ({ products, addToCart }) => {

  return (
    <section id="produtos" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffe682' }}>
            Nossos Produtos
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubra nossa seleção de doces finos, criados com paixão e ingredientes de primeira qualidade
          </p>
        </div>

        {/* Dica destacada */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div style={{ color: '#ffe682' }} className="text-xl">💡</div>
            <p className="text-gray-300">
              <strong className="text-white">Dica:</strong> Adicione os produtos ao seu pedido e solicite um orçamento personalizado via WhatsApp!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(product => product.available === true).map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-700"
            >
              <div className="relative h-64 overflow-hidden bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffe682' }}>
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {product.description}
                </p>
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-semibold" style={{ color: '#ffe682' }}>
                    A partir de R$ {product.basePrice.toFixed(2).replace('.', ',')}
                  </span>
                  {addToCart && (
                    <button
                      onClick={(event) => {
                        addToCart(product);
                        // Feedback visual simples
                        const button = event.currentTarget;
                        button.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          button.style.transform = 'scale(1)';
                        }, 150);
                      }}
                      className="px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
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
                      title="Adicionar ao pedido"
                    >
                      <Plus size={18} />
                      <span>Adicionar ao Pedido</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
