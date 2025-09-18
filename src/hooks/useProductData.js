import { useState, useEffect } from 'react';

// Dados iniciais dos produtos

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Caramelos Artesanais',
    description: 'Caramelos cremosos feitos com ingredientes selecionados e técnicas tradicionais.',
    image: '/caramelos_artesanais.webp',
    price: 'A partir de R$ 15,00',
    basePrice: 15.00,
    available: true
  },
  {
    id: 2,
    name: 'Macarons Franceses',
    description: 'Delicados macarons com sabores únicos e texturas perfeitas.',
    image: '/macarons_franceses.webp',
    price: 'A partir de R$ 25,00',
    basePrice: 25.00,
    available: true
  },
  {
    id: 3,
    name: 'Bolos Decorados',
    description: 'Bolos personalizados para ocasiões especiais, com decoração artística.',
    image: '/bolos_decorados.webp',
    price: 'A partir de R$ 80,00',
    basePrice: 80.00,
    available: true
  },
  {
    id: 4,
    name: 'Chocolates Gourmet',
    description: 'Chocolates finos com recheios especiais e apresentação elegante.',
    image: '/chocolates_gourmet.webp',
    price: 'A partir de R$ 35,00',
    basePrice: 35.00,
    available: true
  },
  {
    id: 5,
    name: 'Doces de Festa',
    description: 'Variedade de doces finos para eventos e celebrações especiais.',
    image: '/doces_de_festa.webp',
    price: 'A partir de R$ 20,00',
    basePrice: 20.00,
    available: true
  },
  {
    id: 6,
    name: 'Sobremesas Especiais',
    description: 'Sobremesas exclusivas criadas pelos nossos confeiteiros.',
    image: '/sobremesas_especiais.webp',
    price: 'A partir de R$ 18,00',
    basePrice: 18.00,
    available: true
  }
];

const STORAGE_KEY = 'casa_caramelo_products';

export const useProductData = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        // Verificar se os dados são válidos
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar produtos do localStorage:', error);
      // Em caso de erro, usar dados iniciais
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função para atualizar produtos
  const updateProducts = (newProducts) => {
    try {
      // Validar dados antes de salvar
      if (!Array.isArray(newProducts) || newProducts.length === 0) {
        throw new Error('Dados de produtos inválidos');
      }

      // Atualizar estado
      setProducts(newProducts);
      
      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
      return false;
    }
  };

  // Função para resetar para dados iniciais
  const resetProducts = () => {
    try {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return true;
    } catch (error) {
      console.error('Erro ao resetar produtos:', error);
      return false;
    }
  };

  // Função para atualizar preço de um produto específico
  const updateProductPrice = (productId, newPrice) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            basePrice: newPrice,
            price: `A partir de R$ ${newPrice.toFixed(2).replace('.', ',')}`
          };
        }
        return product;
      });

      return updateProducts(updatedProducts);
    } catch (error) {
      console.error('Erro ao atualizar preço do produto:', error);
      return false;
    }
  };

  // Função para obter produto por ID
  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  // Função para verificar se há dados salvos
  const hasSavedData = () => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      return savedProducts !== null;
    } catch (error) {
      return false;
    }
  };

  return {
    products,
    isLoading,
    updateProducts,
    resetProducts,
    updateProductPrice,
    getProductById,
    hasSavedData
  };
};
