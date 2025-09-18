import React from 'react';
import { X, Plus, Minus, ShoppingCart, MessageCircle, Trash2 } from 'lucide-react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, isOpen, toggleCart }) => {
  const whatsappNumber = '5511913277174'; // Número do WhatsApp da empresa

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Extrair o valor numérico do preço (assumindo formato "A partir de R$ XX,XX")
      const priceMatch = item.price.match(/R\$\s*(\d+),?(\d*)/);
      if (priceMatch) {
        const price = parseFloat(priceMatch[1] + '.' + (priceMatch[2] || '00'));
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    let message = "*PEDIDO CASA CARAMELO*\n\n";
    message += "*Resumo do Pedido:*\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preco unitario: ${item.price}\n\n`;
    });
    
    message += `*Total de itens:* ${getTotalItems()}\n`;
    message += `*Valor estimado:* R$ ${getTotalPrice().toFixed(2).replace('.', ',')}\n\n`;
    message += "*Observacoes:*\n";
    message += "- Valores podem variar conforme personalizacao\n";
    message += "- Solicito orcamento detalhado\n\n";
    message += "Aguardo retorno!";
    
    return message;
  };

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const sendToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl;
    if (isMobile()) {
      // Para dispositivos móveis - usa wa.me que abre o app
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } else {
      // Para desktop - tenta primeiro wa.me, se não funcionar, usuário pode usar WhatsApp Web manualmente
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Fallback: copia a mensagem para a área de transferência
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
          alert('Mensagem copiada! Cole no WhatsApp Web se não abrir automaticamente.');
        }).catch(() => {
          // Se falhar, mostra a mensagem para o usuário copiar manualmente
          prompt('Copie esta mensagem para o WhatsApp:', message);
        });
      } else {
        // Fallback para navegadores mais antigos
        prompt('Copie esta mensagem para o WhatsApp:', message);
      }
    }
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all hover:scale-105 z-50"
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
        <div className="relative">
          <ShoppingCart size={24} />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={toggleCart}
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-[#ffe682]">
              Carrinho ({getTotalItems()})
            </h2>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">Seu carrinho está vazio</p>
                <p className="text-sm text-gray-500 mt-2">
                  Adicione produtos para começar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#ffe682] text-sm">
                          {item.name}
                        </h3>
                        <p className="text-[#ffe682] text-sm font-medium">
                          {item.price}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-700 p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Total de itens:</span>
                  <span className="font-semibold text-white">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Valor estimado:</span>
                  <span className="font-bold text-lg text-[#ffe682]">
                    R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Valores podem variar conforme personalização
                </p>
              </div>
              
              <button
                onClick={sendToWhatsApp}
                className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
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
                <MessageCircle size={20} />
                <span>Solicitar Orçamento</span>
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-2">
                Será enviado um resumo via WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
